import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  val;
  constructor(private router: Router) {}

  tabChange(eve) {
    console.log(eve.tab);
    this.val = eve.tab;
  }

  route(route) {
    this.router.navigate([route]);
  }

}
