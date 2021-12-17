import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { VideoListPageRoutingModule } from './video-list-routing.module';

import { VideoListPage } from './video-list.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VideoListPageRoutingModule
  ],
  declarations: [VideoListPage]
})
export class VideoListPageModule {}
