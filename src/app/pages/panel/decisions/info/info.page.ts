import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ApiProvider } from '../../../../services/api';
import { PanelService } from '../../../../services/panel.service';
import { AlertService } from '../../../../services/alert.service';
import { Decision } from '../../../../models/decision';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  id: string;
  decision: Decision;
  model = 'decision';
  decisionsStatus = [];

  constructor(
    private panelService: PanelService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    public app: ApiProvider,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.panelService.get(this.model, this.id).subscribe(
      data => {
        this.decision = data;
      }
    );

    this.panelService.getFilters('decisions_status').subscribe(res => {
      this.decisionsStatus = res.decisions_status;
    });
  }

  call(number) {
    this.app.call(number);
  }

  whatsapp(number) {
    this.app.whatsapp(number);
  }

  status(text) {
    const value = {
      'id': this.id,
      'status_id': text.srcElement.value
    }
    this.panelService.postStatus(this.model, value).subscribe(
      () => {
        this.alertService.presentToast('Status Alterado');
      }
    );
  }

  async deleteConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: `Deseja excluir <strong>${this.decision.name}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Excluir',
          handler: () => {
            this.panelService.delete(this.model, this.id).subscribe(
              () => {
                this.alertService.presentToast('Removido');
                this.goToBack();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  goToBack () {
    this.router.navigate(['/panel/decisions']);
  }

}
