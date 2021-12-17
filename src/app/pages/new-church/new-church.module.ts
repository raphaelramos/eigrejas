import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewChurchPageRoutingModule } from './new-church-routing.module';

import { MaskModule } from 'src/app/shared/mask.module';

import { NewChurchPage } from './new-church.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NewChurchPageRoutingModule,
    MaskModule
  ],
  declarations: [
    NewChurchPage
  ]
})
export class NewChurchPageModule {}
