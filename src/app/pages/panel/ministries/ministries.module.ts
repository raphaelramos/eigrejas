import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinistriesPageRoutingModule } from './ministries-routing.module';

import { MinistriesPage } from './ministries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinistriesPageRoutingModule
  ],
  declarations: [MinistriesPage]
})
export class MinistriesPageModule {}
