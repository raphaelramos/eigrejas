import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ApiProvider } from '../../../services/api';

@Component({
  selector: 'app-new-modal',
  templateUrl: './new-modal.page.html',
  styleUrls: ['./new-modal.page.scss'],
})
export class NewModalPage {

  constructor(
    public router: Router,
    public app: ApiProvider,
    private modalController: ModalController
  ) { }

  signUp() {
    this.modalController.dismiss();
    return this.router.navigate(['/new-church/']);
  }

  info() {
    this.modalController.dismiss();
    this.app.openUrlApp('https://eigrejas.com?app');
  }

  plans() {
    this.modalController.dismiss();
    return this.router.navigate(['/plans/']);
  }

  whatsapp() {
    this.app.whatsappSupport();
  }

  goToBack() {
    this.modalController.dismiss();
  }

}
