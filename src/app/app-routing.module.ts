import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./core/layout/layout.component";
import {AuthGuard} from "./core/services/guard/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'test',
    component: LayoutComponent,
    loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule),
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
