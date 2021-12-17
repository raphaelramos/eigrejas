import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsPage } from './groups.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage
  },
  {
    path: 'form',
    loadChildren: () => import('./groups-form/groups-form.module').then( m => m.GroupsFormPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./groups-info/groups-info.module').then( m => m.GroupsInfoPageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./groups-members/groups-members.module').then( m => m.GroupsMembersPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./groups-reports/groups-reports.module').then( m => m.GroupsReportsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
