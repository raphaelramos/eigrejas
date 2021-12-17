import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembersInfoPageRoutingModule } from './members-info-routing.module';

import { MaskModule } from 'src/app/shared/mask.module';

import { MembersInfoPage } from './members-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembersInfoPageRoutingModule,
    MaskModule
  ],
  declarations: [
    MembersInfoPage
  ]
})
export class MembersInfoPageModule {}
