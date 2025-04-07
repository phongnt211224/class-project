import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ModulesModule} from "./modules/modules.module";
import {CoreModule} from "./core/core.module";
import {LayoutComponent} from "@core/layout/layout.component";
import {NzIconModule} from "ng-zorro-antd/icon";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ModulesModule,
    AppRoutingModule,
    CoreModule,
    NzIconModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
