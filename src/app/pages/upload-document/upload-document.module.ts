import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadDocumentPageRoutingModule } from './upload-document-routing.module';

import { UploadDocumentPage } from './upload-document.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadDocumentPageRoutingModule
  ],
  declarations: [UploadDocumentPage]
})
export class UploadDocumentPageModule {}
