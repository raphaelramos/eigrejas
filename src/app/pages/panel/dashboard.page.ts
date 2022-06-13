import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiProvider } from 'src/app/services/api';

interface Menus {
  name: string;
  router: string;
  permission: number;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  groupsName = 'Celulas';
  permissionContent = false;
  permissions = [];
  menus: Menus[] = [
    {
      "name": "Membros",
      "router": "members",
      "permission": 1,
      "icon": "people-outline"
    },
    {
      "name": "Decisões",
      "router": "decisions",
      "permission": 2,
      "icon": "happy-outline"
    },
    {
      "name": "Contagens",
      "router": "count",
      "permission": 3,
      "icon": "podium-outline"
    },
    {
      "name": "Grupos",
      "router": "groups",
      "permission": 4,
      "icon": "layers-outline"
    },
    {
      "name": "Relatórios",
      "router": "reports",
      "permission": 8,
      "icon": "pie-chart-outline"
    },
    {
      "name": "Ministérios",
      "router": "ministries",
      "permission": 5,
      "icon": "copy-outline"
    },
    {
      "name": "Eventos",
      "router": "coming-soon",
      "permission": 6,
      "icon": "calendar-clear-outline"
    },
    // {
    //   "name": "Financeiro",
    //   "router": "coming-soon",
    //   "permission": 7,
    //   "icon": "wallet-outline"
    // },
    {
      "name": "Locais",
      "router": "places",
      "permission": 9,
      "icon": "locate-outline"
    }
  ]

  constructor(
    public app: ApiProvider,
    private router: Router
  ) { }

  ngOnInit() {
    this.app.names$
    .subscribe(res => {
      this.groupsName = res.groups;
    });

    // check permissions
    this.app.userData$
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
    this.app.church$
    .subscribe(res => {
      if (res) {
        this.go(`http://${res}.eigrejas.com/painel`);
      }
    });
  }

}
