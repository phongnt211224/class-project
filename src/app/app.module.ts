import {LOCALE_ID, NgModule} from '@angular/core';
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
import vi from '@angular/common/locales/vi';
import {NZ_I18N, vi_VN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from "@angular/common";
registerLocaleData(vi);


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
    },
    { provide: NZ_I18N, useValue: vi_VN },  // or vi_VN for Vietnamese
    { provide: LOCALE_ID, useValue: 'vi' }  // or 'vi'
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
