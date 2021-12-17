import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecisionsFormPage } from './decisions-form.page';

const routes: Routes = [
  {
    path: '',
    component: DecisionsFormPage
  },
  {
    path: ':id',
    component: DecisionsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecisionsFormPageRoutingModule {}
