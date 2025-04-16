import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "@core/services/project/project.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-prj-form',
  templateUrl: './prj-form.component.html',
  styleUrls: ['./prj-form.component.scss']
})
export class PrjFormComponent implements OnInit {
  @Input() data:any
  form!: FormGroup;
  fb:FormBuilder;

  constructor(
    private projectService:ProjectService,
  ) {

  }

  ngOnInit(): void {
    console.log(this.data)
    this.initForm()
  }

  initForm(){
    this.form = this.fb.group({
      projectId:[null],
      name:[null],
      description:[null],
      start_date:[null],
      end_date:[null]
    })
  }

}
