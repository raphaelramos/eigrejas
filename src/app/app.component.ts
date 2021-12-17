import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

import { ApiProvider } from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    public app: ApiProvider,
    private router: Router,
    private zone: NgZone,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const changeStatusBar = async () => {
      await StatusBar.setStyle({ style: Style.Light });
    }
    changeStatusBar;
    SplashScreen.hide();
    this.deepLink();

    this.platform.ready().then(() => {
      this.initPush();
    });
  }

  church() {
    return this.app.church;
  }

  initPush() {
    // push code
  }
  
  deepLink() {
    App.addListener('appUrlOpen', (data: any) => {
      this.zone.run(() => {
          // Example url: https://beerswift.org.br/tabs/tab2
          // slug = /tabs/tab2
          const slug = data.url.split(".com").pop();
          if (slug) {
            let component = slug;
            // remove last / path
            if (component.slice(-1) == '/')
            {
              component = component.slice(0, -1); 
            }
      
            this.app.openUrlApp(data.url);
          }
          // If no match, do nothing - let regular routing
          // logic take over
      });
    });
  }

}
