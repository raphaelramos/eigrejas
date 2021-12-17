import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersInfoPage } from './members-info.page';

const routes: Routes = [
  {
    path: ':id',
    component: MembersInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersInfoPageRoutingModule {}
