import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HTTP_STATUS_CODE, Mode} from "@core/shared/constants/common";
import {compareWithToday} from "@core/shared/utils/validators.utils";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {AdminService} from "@core/services/admin/admin.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalRef} from "ng-zorro-antd/modal";
import * as moment from "moment/moment";

@Component({
  selector: 'app-ain-form',
  templateUrl: './ain-form.component.html',
  styleUrls: ['./ain-form.component.scss']
})
export class AinFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;

  roles = [
    {value: 'Admin', label: 'Admin'},
    {value: 'Lecturer', label: 'Lecturer'},
    {value: 'Student', label: 'Student'}
  ];

  @Input() data: any
  @Input() mode: any

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
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
      username: [null, Validators.required],
      last_name: [null, Validators.required],
      first_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required, Validators.pattern(/^0\d{9}$/)]],
      birth: [null, Validators.required],
      mssv: [null, Validators.required],
      role: ['Student', Validators.required],
    }, {
      validators: compareWithToday('birth', 'rangeDateError')
    })
  }

  initData() {
    if (this.data?.id) {
      this.adminService.getDataById(this.data.id).subscribe(res => {
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
        this.adminService.postCreate(formValue).subscribe({
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
        this.adminService.putUpdate(formValue, this.data.id).subscribe({
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


}
