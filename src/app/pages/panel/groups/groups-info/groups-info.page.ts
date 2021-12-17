import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ApiProvider } from '../../../../services/api';
import { PanelService } from '../../../../services/panel.service';
import { AlertService } from '../../../../services/alert.service';
import { Group } from '../../../../models/group';

@Component({
  selector: 'app-groups-info',
  templateUrl: './groups-info.page.html',
  styleUrls: ['./groups-info.page.scss'],
})
export class GroupsInfoPage implements OnInit {

  id: string;
  group: Group
  model = 'group';

  constructor(
    private panelService: PanelService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public app: ApiProvider,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.panelService.get(this.model, this.id).subscribe(
      data => {
        this.group = data;
      }
    );
  }

  call(number) {
    this.app.call(number);
  }

  whatsapp(number) {
    this.app.whatsapp(number);
  }

  async deleteConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: `Deseja excluir <strong>${this.group.name}</strong>?`,
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
              data => {
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
    this.router.navigate(['/panel/groups']);
  }

}
