import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { PanelService } from 'src/app/services/panel.service';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-ministries',
  templateUrl: './ministries.page.html',
  styleUrls: ['./ministries.page.scss'],
})
export class MinistriesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  page = 1;
  results = 15;
  loading = true;
  errorMessage = false;
  searchText = '';
  placeId = '';
  model = 'ministry';
  ministries = [];
  places = [];

  skeletons = [0, 0, 0, 0, 0, 0, 0, 0]; //qtd loading

  constructor(
    private panelService: PanelService,
    private deleteService: DeleteService
  ) { }

  ngOnInit() {
    this.panelService.getFilters('places').subscribe(res => {
      this.places = res.places;
    });
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.errorMessage = false;
    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe(res => {
      this.loading = false;
      this.ministries = res;
    }, error => {
      this.loading = false;
      this.errorMessage = true;
    });
  }

  doInfinite(event: any) {
    this.page++;

    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe(res => {
      this.ministries = [...this.ministries, ...res];

      if (res.length < this.results) {
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }

  filters() {
    return { 'place_id': this.placeId };
  }

  search(text) {
    this.searchText = text.srcElement.value;
    this.load();
  }

  searchPlace(text) {
    this.placeId = text.srcElement.value;
    this.load();
  }

  async deleteConfirm(name, id, index) {
    this.deleteService.confirm(name, id, index, this.model).then(res => {
      if (res === 'deleted') {
        this.ministries.splice(index, 1);
      }
    });
  }

}
