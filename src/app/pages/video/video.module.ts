import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { VideoPageRoutingModule } from './video-routing.module';

import { VideoPage } from './video.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VideoPageRoutingModule,
  ],
  declarations: [VideoPage]
})
export class VideoPageModule { }
