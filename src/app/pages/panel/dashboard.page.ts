import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiProvider } from 'src/app/services/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  groupsName = 'Celulas';
  permissionContent = false;
  permissions = [];

  constructor(
    public app: ApiProvider,
    private router: Router
  ) { }

  ngOnInit() {
    this.app.names
    .subscribe(res => {
      this.groupsName = res.groups;
    });

    // check permissions
    this.app.userData
    .subscribe(res => {
      if (res) {
        this.permissions = res.permission.panel_sections.split(",");
        this.permissionContent = !!res.permission.content_status;
      }
    });
  }

  checkPermissions(idMenu) {
    if (this.permissions.includes('0') || this.permissions.includes(String(idMenu))) {
      return true;
    }
    return false;
  }

  route(route) {
    this.router.navigate([route]);
  }

  go(url) {
    this.app.openUrlApp(url);
  }

  goToCMS() {
    this.app.church
    .subscribe(res => {
      if (res) {
        this.go(`http://${res}.eigrejas.com/painel`);
      }
    });
  }

}
