import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'commits',
    loadChildren: () =>
      import('./modules/overview/overview.module').then(
        (m) => m.OverviewModule
      ),
  },
  {
    path: '',
    redirectTo: '/commits',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
