import { Component, OnInit } from '@angular/core';

import { ApiProvider } from 'src/app/services/api';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
})
export class AppPage implements OnInit {

  constructor(public app: ApiProvider) { }

  ngOnInit() {
  }

  go(url) {
    this.app.openUrlApp(url);
  }

}
