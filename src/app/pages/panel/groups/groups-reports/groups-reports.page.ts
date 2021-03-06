import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

import { PanelService } from 'src/app/services/panel.service';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-groups-reports',
  templateUrl: './groups-reports.page.html',
  styleUrls: ['./groups-reports.page.scss'],
})
export class GroupsReportsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  groupId = '';
  page = 1;
  results = 15;
  loading = true;
  errorMessage = false;
  searchText = '';
  model = 'group-report';
  placeId: string;
  counts = [];
  places = [];
  dateValue: string;
  today = new Date();

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

      if (res.length < this.results) {
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }

  filters() {
    return {
      'group_id': this.groupId
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

  formatDate(value: string) {
    return format(parseISO(value), 'MM/yyyy');
  }

  async deleteConfirm(name, id, index) {
    this.deleteService.confirm(name, id, index, this.model).then(res => {
      if (res === 'deleted') {
        this.counts.splice(index, 1);
      }
    });
  }

}
