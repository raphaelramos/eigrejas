import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountPage } from './count.page';

const routes: Routes = [
  {
    path: '',
    component: CountPage
  },
  {
    path: 'form',
    loadChildren: () => import('./count-form/count-form.module').then( m => m.CountFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountPageRoutingModule {}
