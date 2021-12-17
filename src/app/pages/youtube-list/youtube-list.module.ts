import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { YoutubeListPageRoutingModule } from './youtube-list-routing.module';

import { YoutubeListPage } from './youtube-list.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    YoutubeListPageRoutingModule
  ],
  declarations: [YoutubeListPage]
})
export class YoutubeListPageModule {}
