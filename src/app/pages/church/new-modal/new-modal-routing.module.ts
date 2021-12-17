import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewModalPage } from './new-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewModalPageRoutingModule {}
