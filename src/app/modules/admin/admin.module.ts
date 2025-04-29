import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AinIndexComponent} from './ain-index/ain-index.component';
import {AinFormComponent} from './ain-form/ain-form.component';
import {SharedModule} from "@core/shared/shared.module";
import {NzTableModule} from "ng-zorro-antd/table";


@NgModule({
  declarations: [
    AinIndexComponent,
    AinFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NzTableModule
  ]
})
export class AdminModule {
}
