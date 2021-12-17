import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { DynamicBgModule } from '../../shared/dynamic-bg.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    DynamicBgModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
