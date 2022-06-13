import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';

import { ApiProvider } from 'src/app/services/api';

import { PanelService } from 'src/app/services/panel.service';
import { ReportService } from 'src/app/services/report.service';

import { Report } from '../../../models/report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  groupsName = 'Celulas';
  groupName = 'Celula';
  placeId = '';
  date = '';
  places = [];
  total: Report;
  totalDate: Report;
  dateValue: string;

  constructor(
    public app: ApiProvider,
    private panelService: PanelService,
    private reportService: ReportService
  ) { }

   ngOnInit() {
    this.app.names$
    .subscribe(res => {
      this.groupsName = res.groups;
      this.groupName = res.group;
    });

    this.panelService.getFilters('places').subscribe(res => {
      this.places = res.places;
    });
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.reportService.getIndex(this.filters()).subscribe(res => {
      this.total = res;
    }, error => {});
  }

  filters() {
    return {
      'place_id': this.placeId
    };
  }

  searchPlace(text) {
    this.placeId = text.srcElement.value;
    this.load();
  }

  search(text) {
    const date = new Date(text.srcElement.value);
    this.date = String(date.getFullYear() + '-' + (date.getMonth()+1) + '-01');
    this.reportService.getDate(this.date, this.filters()).subscribe(res => {
      this.totalDate = res;
    }, error => {});
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MM/yyyy');
  }

}
