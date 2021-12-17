import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubeListPage } from './youtube-list.page';

const routes: Routes = [
  {
    path: '',
    component: YoutubeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeListPageRoutingModule {}
