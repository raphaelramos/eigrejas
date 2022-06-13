import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { PanelService } from 'src/app/services/panel.service';
import { DeleteService } from 'src/app/services/delete.service';
import { ErrorService } from 'src/app/shared/error.service';
import { Decision } from '../../../models/decision';

@Component({
  selector: 'app-decisions',
  templateUrl: './decisions.page.html',
  styleUrls: ['./decisions.page.scss'],
})
export class DecisionsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  page = 1;
  results = 15;
  searchText = '';
  placeId = '';
  statusId = 1;
  model = 'decision';
  decisions = null;
  places = [];
  decisionsStatus = [];

  skeletons = [0, 0, 0, 0, 0, 0, 0, 0]; //qtd loading

  constructor(
    private panelService: PanelService,
    private deleteService: DeleteService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.panelService.getFilters('places,decisions_status').subscribe(res => {
      this.places = res.places;
      this.decisionsStatus = res.decisions_status;
    });
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe((res: [Decision]) => {
      this.decisions = res;
    }, (error: string) => {
      this.errorService.message(error);
    });
  }

  doInfinite(event: any) {
    this.page++;

    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe((res: [Decision]) => {
      this.decisions = [...this.decisions, ...res];

      if (res.length < this.results) {
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }

  filters() {
    return {
      'place_id': this.placeId,
      'status_id': this.statusId
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

  searchStatus(text) {
    this.statusId = text.srcElement.value;
    this.load();
  }

  async deleteConfirm(name, id, index) {
    this.deleteService.confirm(name, id, index, this.model).then(res => {
      if (res === 'deleted') {
        this.decisions.splice(index, 1);
      }
    });
  }

}

