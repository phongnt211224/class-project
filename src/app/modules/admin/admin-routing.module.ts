import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrjIndexComponent} from "@app/modules/project/pages/prj-index/prj-index.component";
import {AinIndexComponent} from "@app/modules/admin/ain-index/ain-index.component";

const routes: Routes = [
  {
    path: '',
    component: AinIndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
