import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersFormPage } from './members-form.page';

const routes: Routes = [
  {
    path: '',
    component: MembersFormPage
  },
  {
    path: ':id',
    component: MembersFormPage
  },
  {
    path: 'group/:groupId',
    component: MembersFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersFormPageRoutingModule {}
