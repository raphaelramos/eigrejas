import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsFormPage } from './groups-form.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsFormPage
  },
  {
    path: ':id',
    component: GroupsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsFormPageRoutingModule {}
