import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersPage } from './members.page';

const routes: Routes = [
  {
    path: '',
    component: MembersPage
  },
  {
    path: 'form',
    loadChildren: () => import('./members-form/members-form.module').then( m => m.MembersFormPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./members-info/members-info.module').then( m => m.MembersInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersPageRoutingModule {}
