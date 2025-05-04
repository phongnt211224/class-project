import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HTTP_STATUS_CODE, Mode} from "@core/shared/constants/common";
import {compareWithToday} from "@core/shared/utils/validators.utils";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {AdminService} from "@core/services/admin/admin.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalRef} from "ng-zorro-antd/modal";
import * as moment from "moment/moment";
import {ResearchFieldService} from "@core/services/project/researchField.service";

@Component({
  selector: 'app-rld-form',
  templateUrl: './rld-form.component.html',
  styleUrls: ['./rld-form.component.scss']
})
export class RldFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;

  roles = [
    {value: 'admin', label: 'Admin'},
    {value: 'lecturer', label: 'Lecturer'},
    {value: 'student', label: 'Student'}
  ];

  @Input() data: any
  @Input() mode: any

  constructor(
    private fb: FormBuilder,
    private researchFieldService: ResearchFieldService,
    private message: NzMessageService,
    private modal: NzModalRef
  ) {
    this.initForm()
  }

  ngOnInit(): void {
    if (this.mode !== Mode.ADD) {
      this.initData()
    }
    if (this.mode === Mode.VIEW) {
      this.form.disable();
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null],
    }, {
    })
  }

  initData() {
    if (this.data?.id) {
      this.researchFieldService.getDataById(this.data.id).subscribe(res => {
        let birth = moment(res.data.birth, 'DD/MM/YYYY').toDate();
        this.form.patchValue({...res.data, birth: birth})
      })
    }
  }


  getLabelForm(label: string, isRequired: boolean) {
    if (isRequired) {
      label += ' <span class=\'label__required\'>*</span>';
    }
    return label
  }

  get f() {
    return this.form.controls;
  }

  save(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      const formValue = this.convertDataToFormData(this.form.value);
      if (this.mode === Mode.ADD) {
        this.researchFieldService.postCreate(formValue).subscribe({
          next: (res) => {
            if (res && res.code === HTTP_STATUS_CODE.SUCCESS) {
              this.message.success('Thêm mới thành công');
              this.form.reset();
              this.modal.close(true);
            }
          },
          error: (err) => {
            this.message.error('Failed to create');
          },
        });
      } else if (this.mode === Mode.EDIT) {
        this.researchFieldService.putUpdate(formValue, this.data.id).subscribe({
          next: (res) => {
            if (res && res.code === HTTP_STATUS_CODE.SUCCESS) {
              this.message.success('Cập nhật thành công');
              this.form.reset();
              this.modal.close(true);
            }
          },
          error: (err) => {
            this.message.error('Failed to update');
          },
        });
      }
    }
  }

  convertDataToFormData(formValue: any, files: NzUploadFile[] = [], deletedFiles: string[] = []): FormData {
    const formData = new FormData();

    for (const key in formValue) {
      if (formValue[key] instanceof Date || (formValue[key]?.toDate && typeof formValue[key].toDate === 'function')) {
        const date = formValue[key].toDate ? formValue[key].toDate() : formValue[key];
        formData.append(key, date.toLocaleDateString('en-CA'));
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


}
