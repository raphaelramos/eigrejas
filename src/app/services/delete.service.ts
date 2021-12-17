import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

import { PanelService } from 'src/app/services/panel.service';
import { AlertService } from 'src/app/services/alert.service';

import { ApiProvider } from './api';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(
    public app: ApiProvider,
    private panelService: PanelService,
    private alertController: AlertController,
    private alertService: AlertService,
  ) { }

  async confirm(name, id, index, model): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: `Deseja excluir <strong>${name}</strong>?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve('cancel');
            }
          }, {
            text: 'Excluir',
            handler: (deleted) => {
                this.panelService.delete(model, id).subscribe(
                    () => {
                        resolve('deleted');
                        this.alertService.presentToast('Removido');
                    }
                );
            }
          }
        ]
      });
      alert.present();
    });
  }

}
