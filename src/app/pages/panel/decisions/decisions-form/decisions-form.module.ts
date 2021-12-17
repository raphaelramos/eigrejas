import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecisionsFormPageRoutingModule } from './decisions-form-routing.module';

import { MaskModule } from 'src/app/shared/mask.module';

import { DecisionsFormPage } from './decisions-form.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    DecisionsFormPageRoutingModule,
    MaskModule
  ],
  declarations: [
    DecisionsFormPage
  ]
})
export class DecisionsFormPageModule {}
