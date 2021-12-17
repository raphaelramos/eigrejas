import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { TopicsService } from 'src/app/services/topics.service';
import { ApiProvider } from '../services/api';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menu = [];
  user: User;
  church: string;
  newVersion: boolean;
  panel_status = false;

  constructor(
    public app: ApiProvider,
    private TP: TopicsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // set user
    this.app.userData
    .subscribe(res => {
      if (res) {
        this.panel_status = !!res.permission.panel_status;
        this.user = res.user;
      }
    });
  
    // check new version app
    this.app.newVersion
    .subscribe(res => {
      this.newVersion = res;
    });
  }

  ngAfterContentChecked(): void
  {
    // set menu
    this.menu = this.app.menu;
  }

  boolean(data) {
    return !!data;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/home']);
  }
  
  goMenu(cat = 0, href = null) {
    if (!href && cat<1) {
      return;
    }

    if (href && this.isValidURL(href)) {
      return this.app.openUrlApp(href);
    }

    if (href && href == 'fale-conosco') {
      return this.router.navigate(['/contact']);
    }

    if (cat>0) {
      return this.goToCatList(cat);
    }

    if (href == 'home') {
      return this.router.navigate(['/home']);
    }

    this.TP.getPostbySlug(href).subscribe(res => {
      this.router.navigate(['/post/', res.id]);
    }, error => {});
  }

  goToCatList(id) {
    const navData: NavigationExtras = {
      queryParams : {
        id : id
      }
    };    
    this.router.navigate(['/category-list'] , navData);
  }

  goToChurches = async () => {
    await this.app.removeChurch();
    return this.router.navigate(['/church']);
  }

  goToSettings = async () => {
    return this.router.navigate(['/settings']);
  }

  goToPanel = async () => {
    return this.router.navigate(['/panel']);
  }

  isValidURL(str) {
    var a  = document.createElement('a');
    a.href = str;
    return (a.host && a.host != window.location.host);
  }

}
