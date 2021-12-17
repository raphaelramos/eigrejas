import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsReportsPage } from './groups-reports.page';

const routes: Routes = [
  {
    path: ':id',
    component: GroupsReportsPage
  },
  {
    path: ':id/form',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsReportsPageRoutingModule {}
