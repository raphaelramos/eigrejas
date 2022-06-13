import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { ApiProvider } from '../../../../services/api';
import { PanelService } from '../../../../services/panel.service';
import { AlertService } from '../../../../services/alert.service';
import { Member } from '../../../../models/member';

@Component({
  selector: 'app-members-info',
  templateUrl: './members-info.page.html',
  styleUrls: ['./members-info.page.scss'],
})
export class MembersInfoPage implements OnInit {

  id: string;
  member: Member
  model = 'member';
  groupsName = 'Celulas';
  loading = true;
  groups = [];
  ministries = [];
  memberGroups = [];
  memberMinistries = [];
  groupSelectId: string;
  ministrySelectId: string;

  constructor(
    private panelService: PanelService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public app: ApiProvider,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.panelService.get(this.model, this.id).subscribe(
      data => {
        this.member = data;
      }
    );

    // set group name
    this.app.names$
    .subscribe(res => {
      this.groupsName = res.groups;
    });

    this.getRelationships();
  }

  getRelationships() {
    this.panelService.get('members-relationships', this.id).subscribe(
      data => {
        this.loading = false;
        this.memberGroups = data.groups;
        this.memberMinistries = data.ministries;
      }
    );
  }

  calculateAge(birthday) { // birthday is a date
    let date = new Date(birthday);
    let ageDifMs = Date.now() - date.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  call(number) {
    this.app.call(number);
  }

  whatsapp(number) {
    this.app.whatsapp(number);
  }

  getGroups() {
    this.panelService.getFilters('groups, ministries').subscribe(res => {
      this.groups = res.groups;
      this.ministries = res.ministries;
    });
  }

  groupSelect(text) {
    this.groupSelectId = text.srcElement.value;
  }

  ministrySelect(text) {
    this.ministrySelectId = text.srcElement.value;
  }

  addGroup() {
    this.panelService.putMemberRel(this.member.id, this.groupSelectId, 'group').subscribe(() => {
      this.alertService.presentToast('Adicionado');
      this.groupSelectId = null;
      this.getRelationships();
    });
  }

  addMinistry() {
    this.panelService.putMemberRel(this.member.id, this.ministrySelectId, 'ministry').subscribe(() => {
      this.alertService.presentToast('Adicionado');
      this.ministrySelectId = null;
      this.getRelationships();
    });
  }

  async deleteConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: `Deseja excluir <strong>${this.member.name}</strong>?`,
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
                this.alertService.presentToast('Membro Removido');
                this.goToBack();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteRel(name, id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: `Deseja remover de <strong>${name}</strong>?`,
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
            this.panelService.delete('members-relationships', id).subscribe(
              () => {
                this.alertService.presentToast('Removido');
                this.getRelationships();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  goToBack () {
    this.navCtrl.back();
  }

}
