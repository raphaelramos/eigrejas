import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import { NavExtrasService } from '../../services/nav.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  loading = true;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    public navExtras: NavExtrasService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.loading = false;
    }, 6000);
  }

  openChurch() {
    const login = this.navExtras.getExtras();
    if (login) {
      this.authService.login(login).subscribe();
      this.navExtras.clearExtras();
    }

    this.navCtrl.navigateRoot(`/church`);
  }

}
