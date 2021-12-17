import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SlidePageRoutingModule } from './slide-routing.module';

import { SlidePage } from './slide.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SlidePageRoutingModule
  ],
  declarations: [SlidePage]
})
export class SlidePageModule {}
