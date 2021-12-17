import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaskModule } from 'src/app/shared/mask.module';

import { GroupsInfoPageRoutingModule } from './groups-info-routing.module';

import { GroupsInfoPage } from './groups-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsInfoPageRoutingModule,
    MaskModule
  ],
  declarations: [GroupsInfoPage]
})
export class GroupsInfoPageModule {}
