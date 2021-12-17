import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewChurchPage } from './new-church.page';

const routes: Routes = [
  {
    path: '',
    component: NewChurchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewChurchPageRoutingModule {}
