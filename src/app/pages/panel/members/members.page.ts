import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { PanelService } from 'src/app/services/panel.service';
import { DeleteService } from 'src/app/services/delete.service';
import { ErrorService } from 'src/app/shared/error.service';
import { Member } from '../../../models/member';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  page = 1;
  results = 15;
  searchText = '';
  groupId = '';
  placeId = '';
  ministryId = '';
  model = 'member';
  members = null;
  places = [];

  skeletons = [0, 0, 0, 0, 0, 0, 0, 0]; //qtd loading

  constructor(
    private panelService: PanelService,
    private deleteService: DeleteService,
    private errorService: ErrorService
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
    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe((res: [Member]) => {
      this.members = res;
    }, (error: string) => {
      this.errorService.message(error);
    });
  }

  doInfinite(event: any) {
    this.page++;

    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe((res: [Member]) => {
      this.members = [...this.members, ...res];

      if (res.length < this.results) {
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }

  filters() {
    return {
      'place_id': this.placeId,
      'group_id': this.groupId,
      'ministry_id': this.ministryId
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

  async deleteConfirm(name, id, index) {
    this.deleteService.confirm(name, id, index, this.model).then(res => {
      if (res === 'deleted') {
        this.members.splice(index, 1);
      }
    });
  }

}
