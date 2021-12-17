import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsFormPageRoutingModule } from './groups-form-routing.module';

import { MaskModule } from 'src/app/shared/mask.module';

import { GroupsFormPage } from './groups-form.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    GroupsFormPageRoutingModule,
    MaskModule
  ],
  declarations: [GroupsFormPage]
})
export class GroupsFormPageModule {}
