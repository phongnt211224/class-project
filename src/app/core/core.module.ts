import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {SharedModule} from "@core/shared/shared.module";
import {BaseComponent} from "@core/components/base.component";



@NgModule({
  declarations: [
    LayoutComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    RouterLinkWithHref
  ]
})
export class CoreModule { }
