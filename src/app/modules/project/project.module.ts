import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { PrjIndexComponent } from './pages/prj-index/prj-index.component';
import {SharedModule} from "@core/shared/shared.module";


@NgModule({
  declarations: [
    PrjIndexComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
