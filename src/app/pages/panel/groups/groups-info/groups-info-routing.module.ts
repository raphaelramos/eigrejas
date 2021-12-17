import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsInfoPage } from './groups-info.page';

const routes: Routes = [
  {
    path: ':id',
    component: GroupsInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsInfoPageRoutingModule {}
