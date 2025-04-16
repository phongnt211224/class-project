import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { PrjIndexComponent } from './pages/prj-index/prj-index.component';
import {SharedModule} from "@core/shared/shared.module";
import { PrjFormComponent } from './pages/prj-form/prj-form.component';


@NgModule({
  declarations: [
    PrjIndexComponent,
    PrjFormComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
