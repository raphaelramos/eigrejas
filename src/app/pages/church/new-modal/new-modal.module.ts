import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NewModalPageRoutingModule } from './new-modal-routing.module';

import { NewModalPage } from './new-modal.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NewModalPageRoutingModule
  ],
  declarations: [NewModalPage]
})
export class NewModalPageModule {}
