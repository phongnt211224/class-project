import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// Import all the required Ant Design modules here
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {ToastrModule} from "ngx-toastr";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzGridModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzModalModule,
    NzBreadCrumbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzGridModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzModalModule,
    NzBreadCrumbModule,
    NzPaginationModule,
    ToastrModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
