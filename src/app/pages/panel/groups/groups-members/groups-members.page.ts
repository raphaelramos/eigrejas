import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

import { PanelService } from 'src/app/services/panel.service';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-groups-members',
  templateUrl: './groups-members.page.html',
  styleUrls: ['./groups-members.page.scss'],
})
export class GroupsMembersPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  groupId = '';
  placeId = '';
  ministryId = '';
  page = 1;
  results = 15;
  loading = true;
  errorMessage = false;
  searchText = '';
  model = 'member';
  members = [];

  skeletons = [0, 0, 0, 0, 0, 0, 0, 0]; //qtd loading

  constructor(
    private route: ActivatedRoute,
    private panelService: PanelService,
    private deleteService: DeleteService
  ) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.errorMessage = false;
    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe(res => {
      this.loading = false;
      this.members = res;
    }, error => {
      this.loading = false;
      this.errorMessage = true;
    });
  }

  doInfinite(event: any) {
    this.page++;

    this.panelService.getIndex(this.model, this.page, this.results, this.searchText, this.filters()).subscribe(res => {
      this.members = [...this.members, ...res];

      if (res.lenght < this.results) {
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

  async deleteConfirm(name, id, index) {
    this.deleteService.confirm(name, id, index, this.model).then(res => {
      if (res === 'deleted') {
        this.members.splice(index, 1);
      }
    });
  }

}

