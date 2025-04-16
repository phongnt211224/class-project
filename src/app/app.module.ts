import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ModulesModule} from "./modules/modules.module";
import {CoreModule} from "./core/core.module";
import {LayoutComponent} from "@core/layout/layout.component";
import {NzIconModule} from "ng-zorro-antd/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppInterceptor} from "@core/services/apis/app-interceptor";
import {CookieService} from "ngx-cookie-service";
import {ReactiveFormsModule} from "@angular/forms";

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
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
