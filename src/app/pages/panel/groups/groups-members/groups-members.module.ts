import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsMembersPageRoutingModule } from './groups-members-routing.module';

import { GroupsMembersPage } from './groups-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsMembersPageRoutingModule
  ],
  declarations: [GroupsMembersPage]
})
export class GroupsMembersPageModule {}
