import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ApiProvider } from 'src/app/services/api';
import { TopicsService } from 'src/app/services/topics.service';
import { NavExtrasService } from 'src/app/services/nav.service';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  logo;
  listBanners;
  newsTopics;
  isInternet = true;
  loading = true;
  errorMessage = false;
  
  slideOpts = {
    slidesPerView: 3,
  };

  slideOpts2 = {
    slidesPerView: 4,
  };

  slideOpts3 = {
    slidesPerView: 2,
  };

  constructor(private TP: TopicsService,
    private router: Router,
    public app: ApiProvider,
    public navExtras: NavExtrasService,
    private screenOrientation: ScreenOrientation) {}

  ngOnInit() {
    // get data
    this.load();

    // unlock screen
    this.screenOrientation.unlock();

    // set logo
    this.app.logo$
    .subscribe(res => {
      this.logo = res;
    });
  }

  ionViewDidEnter() {
    if (this.isInternet != this.app.isOnline()) {
      this.load();
    }
  }

  load() {
    this.isInternet = this.app.isOnline();
    this.loading = true;
    this.errorMessage = false;

    this.TP.getHome().subscribe(res => {
      this.loading = false;
      this.listBanners = res.banners;
      this.newsTopics = res.topics;
    }, error => {
      this.loading = false;
      this.errorMessage = true;
    });
  }

  ytThumb(url) {
    return this.TP.ytThumb(url);
  }

  goToVideo(id) {
    this.router.navigate(['/video', id]);
  }

  goToYoutube(id) {
    this.go(`https://www.youtube.com/watch?v=${id}`);
  }

  goToPost(id) {
    this.router.navigate(['/post/', id]);
  }

  goToVideoList(id, name) {
    const navData: NavigationExtras = {
      queryParams : {
        id : id,
        name : name
      }
    };
    this.router.navigate(['/video-list'], navData);
  }

  goToYoutubeList(id, name) {
    const navData: NavigationExtras = {
      queryParams : {
        id : id,
        name : name
      }
    };
    this.router.navigate(['/youtube-list'], navData);
  }

  goToCatList(id, name) {
    const navData: NavigationExtras = {
      queryParams : {
        id : id,
        name : name
      }
    };
    this.router.navigate(['/category-list'] , navData);
  }

  go(url) {
    this.app.openUrlApp(url);
  }

  goBanner(url) {
    if (url && url != '#') {
      const domain = (new URL(url));
      // internal url
      if (domain.hostname.indexOf('eigrejas.com') >= 0) {
        const path = domain.pathname.replace('/','');
        return this.TP.getPostbySlug(path).subscribe(res => {
          this.router.navigate(['/post/', res.id]);
        }, error => {
          this.app.openUrlApp(url);
        });
      }
      // external url
      this.app.openUrlApp(url);
    }
  }

  openStory(i, data) {
    this.navExtras.setStory(data);
    this.router.navigate(['/slide/', i]);
  }

}
