import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { PrjIndexComponent } from './pages/prj-index/prj-index.component';


@NgModule({
  declarations: [
    PrjIndexComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
