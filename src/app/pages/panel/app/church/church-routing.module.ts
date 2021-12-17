import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChurchPage } from './church.page';

const routes: Routes = [
  {
    path: '',
    component: ChurchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChurchPageRoutingModule {}
