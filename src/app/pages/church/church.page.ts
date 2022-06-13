import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController, ModalController, Platform } from '@ionic/angular';
import { NewModalPage } from './new-modal/new-modal.page';

import { DataService } from '../../services/data.service';
import { ApiProvider } from '../../services/api';

@Component({
  selector: 'app-church',
  templateUrl: './church.page.html',
  styleUrls: ['./church.page.scss'],
})
export class ChurchPage implements OnInit {

  msg: string;
  searchText: string;
  addBtn = true;
  churches = [];
  initalDomain = 'alianca';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    private platform: Platform,
    private data: DataService,
    public app: ApiProvider
  ) { }

  ngOnInit() {
    // disable menu
    this.menuCtrl.enable(false);

    // church inital
    this.app.church$
    .subscribe(res => {
      if (res) {
        this.initalDomain = res;
        this.addBtn = false;
      }
    });

    this.route.queryParams.subscribe(data => {
      this.msg = data.close_msg;
    });
    this.data.getChurchesDomain(this.initalDomain).subscribe(res => {
      this.churches = res;
    });

    // show button add church
    if (this.platform.is("ios")) {
      this.addBtn = false;
    }
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }

  photo(path) {
    return `${this.app.BASE_URL}/${path}`;
  }

  async newModal() {
    const modal = await this.modalCtrl.create({
      component: NewModalPage
    });
    return await modal.present();
  }

  search(text) {
    const name = text.srcElement.value;

    if (name && name !== '') {
      this.data.getChurches(name).subscribe(res => {
        this.churches = res;
      }, error => {});
    } else {
      this.churches = [];
    }
  }

  openChurch = async (id) => {
    await this.app.updateChurch(id);
    this.navCtrl.navigateRoot(`/home/${id}`);
  }

  newChurch() {
    return this.newModal();
  }

}
