import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountFormPageRoutingModule } from './count-form-routing.module';

import { CountFormPage } from './count-form.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CountFormPageRoutingModule
  ],
  declarations: [CountFormPage]
})
export class CountFormPageModule {}
