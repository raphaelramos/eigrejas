import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChurchPageRoutingModule } from './church-routing.module';

import { MaskModule } from 'src/app/shared/mask.module';

import { ChurchPage } from './church.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ChurchPageRoutingModule,
    MaskModule
  ],
  declarations: [ChurchPage]
})
export class ChurchPageModule {}
