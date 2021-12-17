import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationMapPage } from './location-map.page';

const routes: Routes = [
  {
    path: '',
    component: LocationMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationMapPageRoutingModule {}
