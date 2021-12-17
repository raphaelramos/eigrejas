import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinistriesFormPageRoutingModule } from './ministries-form-routing.module';

import { MinistriesFormPage } from './ministries-form.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MinistriesFormPageRoutingModule
  ],
  declarations: [MinistriesFormPage]
})
export class MinistriesFormPageModule {}
