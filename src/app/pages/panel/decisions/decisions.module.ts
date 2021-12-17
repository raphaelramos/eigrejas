import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecisionsPageRoutingModule } from './decisions-routing.module';

import { DecisionsPage } from './decisions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecisionsPageRoutingModule
  ],
  declarations: [DecisionsPage]
})
export class DecisionsPageModule {}
