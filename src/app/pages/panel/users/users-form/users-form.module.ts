import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaskModule } from 'src/app/shared/mask.module';

import { UsersFormPageRoutingModule } from './users-form-routing.module';

import { UsersFormPage } from './users-form.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    UsersFormPageRoutingModule,
    MaskModule
  ],
  declarations: [UsersFormPage]
})
export class UsersFormPageModule {}
