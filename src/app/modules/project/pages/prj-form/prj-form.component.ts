import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "@core/services/project/project.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HTTP_STATUS_CODE, Mode} from "@core/shared/constants/common";
import {compareDate} from "@core/shared/utils/validators.utils";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalRef} from "ng-zorro-antd/modal";
import * as moment from "moment";
import {NzUploadFile, NzUploadXHRArgs} from "ng-zorro-antd/upload";
import {ResearchFieldService} from "@core/services/project/researchField.service";

@Component({
  selector: 'app-prj-form',
  templateUrl: './prj-form.component.html',
  styleUrls: ['./prj-form.component.scss']
})
export class PrjFormComponent implements OnInit {
  @Input() data: any
  @Input() mode: any
  form!: FormGroup;
  fileList: NzUploadFile[] = [];
  deletedFiles: string[] = [];
  isSubmitted = false;

  constructor(
    private projectService: ProjectService,
    private researchFieldService: ResearchFieldService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef
  ) {
    this.initForm()
  }

  ngOnInit(): void {
    if (this.mode !== Mode.ADD) {
      console.log('run into')
      this.initData()
    }
    if (this.mode === Mode.VIEW) {
      this.form.disable();
    }
    this.researchFieldService.getListData().subscribe(res => {
      console.log(res);
    })
  }

  initForm() {
    this.form = this.fb.group({
      projectId: [null],
      name: [null, Validators.required],
      description: [null],
      summary: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null],
      file: [[]],
      feedBackText: [null],
    }, {
      validators: compareDate('start_date', 'end_date', 'rangeDateError')
    })
  }

  get f() {
    return this.form.controls;
  }

  initData() {
    if (this.data?.id) {
      this.projectService.getProject(this.data.id).subscribe(res => {
        let startDate = moment(res.data.start_date, 'DD/MM/YYYY').toDate();
        let endDate = moment(res.data.end_date, 'DD/MM/YYYY').toDate();
        this.form.patchValue({...res.data, start_date: startDate, end_date: endDate})
        this.patchFileList(res)
        console.log(this.form.value)
      })
    }
  }

  save(): void {
    this.isSubmitted = true;
    if (this.mode === Mode.ADD) {
      if (this.form.valid) {
        const formValue = this.convertDataToFormData(this.form.value, this.fileList, this.deletedFiles);
        this.projectService.postCreateProject(formValue).subscribe({
          next: (res) => {
            if (res && res.code === HTTP_STATUS_CODE.SUCCESS) {
              this.message.success('Project created successfully');
              this.fileList = [];
              this.form.reset();
              this.modal.close(true);
            }
          },
          error: (err) => {
            this.message.error('Failed to create project');
            console.error('Error:', err);
          },
        });
      }
    } else if (this.mode === Mode.EDIT) {
      if (this.form.valid) {
        const formValue = this.convertDataToFormData(this.form.value, this.fileList, this.deletedFiles);
        this.projectService.putUpdateProject(formValue, this.data.id).subscribe({
          next: (res) => {
            if (res && res.code === HTTP_STATUS_CODE.SUCCESS) {
              this.message.success('Project updated successfully');
              this.fileList = [];
              this.form.reset();
              this.modal.close(true);
            }
          },
          error: (err) => {
            this.message.error('Failed to update project');
            console.error('Error:', err);
          },
        });
      }
    }
  }

  handleBeforeUpload = (file: NzUploadFile): boolean => {
    const isAllowedType =
      file.type === 'application/pdf' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // .xlsx
      file.type === 'application/msword'; // .doc

    const isLt10MB = file.size / 1024 / 1024 < 10;

    if (!isAllowedType) {
      this.message.error(`${file.name} không đúng định dạng. Chỉ chấp nhận PDF, DOC, XLSX.`);
      return false;
    }

    if (!isLt10MB) {
      this.message.error(`${file.name} vượt quá 10MB.`);
      return false;
    }

    file.status = 'done';
    this.fileList = this.fileList.concat(file);
    this.form.get('file')?.setValue(this.fileList);
    return false
  };

  handleRemove = (file: NzUploadFile): boolean => {
    if (file.url) {
      this.deletedFiles.push(file.name);
    }

    this.fileList = this.fileList.filter(f => f !== file);
    this.form.get('file')?.setValue(this.fileList);
    return true;
  };

  getLabelForm(label: string, isRequired: boolean) {
    if (isRequired) {
      label += ' <span class=\'label__required\'>*</span>';
    }
    return label
  }


  convertDataForm(formValue: any): any {
    const formattedValue = {...formValue};

    for (const key in formattedValue) {
      if (formattedValue[key] instanceof Date || (formattedValue[key]?.toDate && typeof formattedValue[key].toDate === 'function')) {
        const date = formattedValue[key].toDate ? formattedValue[key].toDate() : formattedValue[key];
        formattedValue[key] = new Date(date).toISOString().split('T')[0];
      }
    }

    return formattedValue;
  }

  convertDataToFormData(formValue: any, files: NzUploadFile[], deletedFiles: string[]): FormData {
    const formData = new FormData();

    for (const key in formValue) {
      if (formValue[key] instanceof Date || (formValue[key]?.toDate && typeof formValue[key].toDate === 'function')) {
        const date = formValue[key].toDate ? formValue[key].toDate() : formValue[key];
        formData.append(key, new Date(date).toISOString().split('T')[0]);
      } else if (key !== 'file') {
        formData.append(key, formValue[key]);
      }
    }
    files.forEach(file => {
      if (!file?.url) {
        formData.append('file', file as unknown as File);
      }

    })
    deletedFiles.forEach(fileName => {
      formData.append('deletedFiles', fileName);
    });

    return formData;
  }

  patchFileList(res) {
    const baseImageUrl = "http://localhost:8000/media/projects/files"
    if (this.mode !== Mode.ADD && res.data?.file) {
      this.fileList = res.data.file.map((name, index) => ({
        uid: `${-index - 1}`,
        name: name,
        status: 'done',
        url: `${baseImageUrl}/${name}`,
        thumbUrl: `${baseImageUrl}/${name}`,
      }));

    }
  }


  protected readonly Mode = Mode;
}
