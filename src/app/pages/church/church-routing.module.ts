import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChurchPage } from './church.page';

const routes: Routes = [
  {
    path: '',
    component: ChurchPage
  },
  {
    path: 'new-modal',
    loadChildren: () => import('./new-modal/new-modal.module').then( m => m.NewModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChurchPageRoutingModule {}
