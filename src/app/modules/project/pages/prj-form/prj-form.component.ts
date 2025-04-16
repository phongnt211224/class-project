import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "@core/services/project/project.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HTTP_STATUS_CODE, Mode} from "@core/shared/constants/common";
import {compareDate} from "@core/shared/utils/validators.utils";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalRef} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-prj-form',
  templateUrl: './prj-form.component.html',
  styleUrls: ['./prj-form.component.scss']
})
export class PrjFormComponent implements OnInit {
  @Input() data:any
  @Input() mode:any
  form!: FormGroup;

  constructor(
    private projectService:ProjectService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef
  ) {
    this.initForm()
  }

  ngOnInit(): void {
    if(this.mode !== Mode.ADD){
      console.log('run into')
      this.initData()
    }
    if(this.mode === Mode.VIEW){
      this.form.disable();
    }

  }

  initForm(){
    this.form = this.fb.group({
      projectId:[null],
      name:[null],
      description:[null],
      summary:[null],
      start_date:[null],
      end_date:[null]
    },{
      validators:compareDate('start_date','end_date','rangeDateError')
    })
  }

  initData(){
    if(this.data?.id){
      this.projectService.getProject(this.data.id).subscribe(res =>{
        this.form.patchValue(res.data)
      })
    }

  }

  save(): void {
    if (this.mode === Mode.ADD) {
      if (this.form.valid) {
        const formValue = this.convertDataForm(this.form.value);
        this.projectService.postCreateProject(formValue).subscribe({
          next: (res) => {
            if (res && res.code === HTTP_STATUS_CODE.SUCCESS) {
              this.message.success('Project created successfully');
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
        const formValue = this.convertDataForm(this.form.value);
        this.projectService.putUpdateProject(formValue,this.data.id).subscribe({
          next: (res) => {
            if (res && res.code === HTTP_STATUS_CODE.SUCCESS) {
              this.message.success('Project updated successfully');
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

  convertDataForm(formValue: any): any {
    const formattedValue = { ...formValue };

    for (const key in formattedValue) {
      if (formattedValue[key] instanceof Date || (formattedValue[key]?.toDate && typeof formattedValue[key].toDate === 'function')) {
        const date = formattedValue[key].toDate ? formattedValue[key].toDate() : formattedValue[key];
        formattedValue[key] = new Date(date).toISOString().split('T')[0];
      }
    }

    return formattedValue;
  }

}
