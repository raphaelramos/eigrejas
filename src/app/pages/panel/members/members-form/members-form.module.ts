import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaskModule } from 'src/app/shared/mask.module';

import { MembersFormPageRoutingModule } from './members-form-routing.module';

import { MembersFormPage } from './members-form.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MembersFormPageRoutingModule,
    MaskModule
  ],
  declarations: [
    MembersFormPage
  ]
})
export class MembersFormPageModule {}
