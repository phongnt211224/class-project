import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "@core/services/project/project.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HTTP_STATUS_CODE, Mode} from "@core/shared/constants/common";
import {compareDate} from "@core/shared/utils/validators.utils";

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
    if(this.data?.projectId){
      this.projectService.getProject(this.data.projectId).subscribe(res =>{
        this.form.patchValue(res.data)
      })
    }

  }

  save(){
    if(this.mode === Mode.ADD){
      if(this.form.valid){
        const formValue = this.convertDataForm(this.form.value);
        console.log(formValue)
        this.projectService.postCreateProject(formValue).subscribe(res=>{
          if(res && res.code === HTTP_STATUS_CODE.SUCCESS){
            console.log(res)
          }
        })
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
