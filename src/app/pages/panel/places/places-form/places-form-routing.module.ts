import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesFormPage } from './places-form.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesFormPage
  },
  {
    path: ':id',
    component: PlacesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesFormPageRoutingModule {}
