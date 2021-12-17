import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsReportsPageRoutingModule } from './groups-reports-routing.module';

import { GroupsReportsPage } from './groups-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsReportsPageRoutingModule
  ],
  declarations: [GroupsReportsPage]
})
export class GroupsReportsPageModule {}
