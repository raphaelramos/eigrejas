import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsMembersPage } from './groups-members.page';

const routes: Routes = [
  {
    path: ':id',
    component: GroupsMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsMembersPageRoutingModule {}
