import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaskModule } from 'src/app/shared/mask.module';

import { PlacesFormPageRoutingModule } from './places-form-routing.module';

import { PlacesFormPage } from './places-form.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PlacesFormPageRoutingModule,
    MaskModule
  ],
  declarations: [
    PlacesFormPage
  ]
})
export class PlacesFormPageModule {}
