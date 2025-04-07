import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "@core/shared/shared.module";



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule
  ]
})
export class CoreModule { }
