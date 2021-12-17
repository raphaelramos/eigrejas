import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { ApiProvider } from '../../services/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  count: number = 0;

  constructor(
    public alertController: AlertController,
    public app: ApiProvider,
    private navCrtl: NavController
  ) {}

  ngOnInit() { }

  goToBack() {
    this.navCrtl.back();
  }

  updateFont() {
    this.app.updateFont();
  }

  async clearNews() {
    this.app.clearNews();

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Apagado',
      subHeader: '',
      message: 'Os conteúdos salvos neste aparelho foram removidos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  r2() {
    this.count++;
    if (this.count > 6) {
      this.devAlert();
    }
  }

  async devAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Amamos a criatividade!',
      subHeader: '',
      message: 'Este aplicativo foi desenvolvido por Raphael Ramos e a equipe da R2 Company',
      buttons: ['OK']
    });

    await alert.present();
  }

}
