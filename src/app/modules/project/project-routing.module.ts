import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "@app/modules/auth/pages/login/login.component";
import {RegisterComponent} from "@app/modules/auth/pages/register/register.component";
import {PrjIndexComponent} from "@app/modules/project/pages/prj-index/prj-index.component";

const routes: Routes = [
  {
    path: '',
    component: PrjIndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
