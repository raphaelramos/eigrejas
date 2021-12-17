import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ChurchPageRoutingModule } from './church-routing.module';

import { ChurchPage } from './church.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ChurchPageRoutingModule
  ],
  declarations: [ChurchPage]
})
export class ChurchPageModule {}
