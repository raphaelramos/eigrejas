import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountPageRoutingModule } from './count-routing.module';

import { CountPage } from './count.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountPageRoutingModule
  ],
  declarations: [CountPage]
})
export class CountPageModule {}
