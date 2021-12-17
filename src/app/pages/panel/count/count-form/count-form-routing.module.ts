import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountFormPage } from './count-form.page';

const routes: Routes = [
  {
    path: '',
    component: CountFormPage
  },
  {
    path: ':id',
    component: CountFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountFormPageRoutingModule {}
