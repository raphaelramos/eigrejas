import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { PanelService } from 'src/app/services/panel.service';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.page.html',
  styleUrls: ['./count.page.scss'],
})
export class CountPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  page = 1;
  results = 15;
  loading = true;
  errorMessage = false;
  searchText = '';
  model = 'count';
  placeId = '';
  order = 'from';
  counts = [];
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
      this.counts = res;
    }, error => {
      this.loading = false;
      this.errorMessage = true;
    });
  }

  doInfinite(event: any) {
    this.page++;

    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe(res => {
      this.counts = [...this.counts, ...res];

      if (res.lenght < this.results) {
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }

  filters() {
    return {
      'place_id': this.placeId,
      'order': this.order
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

  searchOrder(text) {
    this.order = text.srcElement.value;
    this.load();
  }

  async deleteConfirm(name, id, index) {
    this.deleteService.confirm(name, id, index, this.model).then(res => {
      if (res === 'deleted') {
        this.counts.splice(index, 1);
      }
    });
  }

}
