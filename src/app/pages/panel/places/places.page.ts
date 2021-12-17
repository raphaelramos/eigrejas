import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { PanelService } from 'src/app/services/panel.service';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  page = 1;
  results = 15;
  loading = true;
  errorMessage = false;
  searchText = '';
  model = 'place';
  places = [];

  skeletons = [0, 0, 0, 0]; //qtd loading

  constructor(
    private panelService: PanelService,
    private deleteService: DeleteService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.errorMessage = false;
    this.panelService.getIndex(this.model, this.page, this.results, this.searchText).subscribe(res => {
      this.loading = false;
      this.places = res;
    }, error => {
      this.loading = false;
      this.errorMessage = true;
    });
  }

  doInfinite(event: any) {
    this.page++;

    this.panelService.getIndex(this.model, this.page, this.results, this.searchText).subscribe(res => {
      this.places = [...this.places, ...res];

      if (res.lenght < this.results) {
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }

  search(text) {
    this.searchText = text.srcElement.value;
    this.load();
  }

  async deleteConfirm(name, id, index) {
    this.deleteService.confirm(name, id, index, this.model).then(res => {
      if (res === 'deleted') {
        this.places.splice(index, 1);
      }
    });
  }

}
