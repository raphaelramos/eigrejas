import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { PanelService } from 'src/app/services/panel.service';
import { ApiProvider } from 'src/app/services/api';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  page = 1;
  results = 15;
  loading = true;
  errorMessage = false;
  searchText = '';
  placeId = '';
  networkId = '';
  model = 'group';
  groupsName = 'Celulas';
  groups = [];
  places = [];
  networks = [];

  skeletons = [0, 0, 0, 0, 0, 0, 0, 0]; //qtd loading

  constructor(
    private panelService: PanelService,
    public app: ApiProvider,
    private deleteService: DeleteService
  ) { }

  ngOnInit() {
    this.panelService.getFilters('places,networks').subscribe(res => {
      this.places = res.places;
      this.networks = res.networks;
    });
   // set group name
   this.app.names$
    .subscribe(res => {
      this.groupsName = res.groups;
    });
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.errorMessage = false;
    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe(res => {
      this.loading = false;
      this.groups = res;
    }, error => {
      this.loading = false;
      this.errorMessage = true;
    });
  }

  doInfinite(event: any) {
    this.page++;

    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe(res => {
      this.groups = [...this.groups, ...res];

      if (res.length < this.results) {
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }

  filters() {
    return { 
      'place_id': this.placeId,
      'network_id': this.networkId,
    };
  }

  search(text) {
    this.searchText = text.srcElement.value;
    this.load();
  }

  searchPlace(text) {
    this.placeId = text.srcElement.value;
    this.load();
  }

  searchNetwork(text) {
    this.networkId = text.srcElement.value;
    this.load();
  }

  async deleteConfirm(name, id, index) {
    this.deleteService.confirm(name, id, index, this.model).then(res => {
      if (res === 'deleted') {
        this.groups.splice(index, 1);
      }
    });
  }

}