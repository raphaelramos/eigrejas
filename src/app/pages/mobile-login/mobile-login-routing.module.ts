import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileLoginPage } from './mobile-login.page';

const routes: Routes = [
  {
    path: '',
    component: MobileLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileLoginPageRoutingModule {}
