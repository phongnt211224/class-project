import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrjIndexComponent} from "@app/modules/project/pages/prj-index/prj-index.component";
import {AinIndexComponent} from "@app/modules/admin/ain-index/ain-index.component";
import {RldIndexComponent} from "@app/modules/admin/rld-index/rld-index.component";

const routes: Routes = [
  {
    path: 'user',
    component: AinIndexComponent
  },
  {
    path: 'researchField',
    component: RldIndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
