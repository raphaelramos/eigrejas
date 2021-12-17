import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationMapPageRoutingModule } from './location-map-routing.module';

import { LocationMapPage } from './location-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationMapPageRoutingModule
  ],
  declarations: [LocationMapPage]
})
export class LocationMapPageModule {}
