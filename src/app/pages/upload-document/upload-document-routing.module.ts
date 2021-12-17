import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadDocumentPage } from './upload-document.page';

const routes: Routes = [
  {
    path: '',
    component: UploadDocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadDocumentPageRoutingModule {}
