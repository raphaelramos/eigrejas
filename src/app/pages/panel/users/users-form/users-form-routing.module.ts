import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersFormPage } from './users-form.page';

const routes: Routes = [
  {
    path: '',
    component: UsersFormPage
  },
  {
    path: ':id',
    component: UsersFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersFormPageRoutingModule {}
