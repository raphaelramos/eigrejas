import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinistriesFormPage } from './ministries-form.page';

const routes: Routes = [
  {
    path: '',
    component: MinistriesFormPage
  },
  {
    path: ':id',
    component: MinistriesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinistriesFormPageRoutingModule {}
