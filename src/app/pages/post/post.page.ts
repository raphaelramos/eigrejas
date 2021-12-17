import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';;
import { AlertController, NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TopicsService } from 'src/app/services/topics.service';
import { ApiProvider } from 'src/app/services/api';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  category = '';
  errorMessage = false;
  id: string;
  isInternet = true;
  items:any = [];
  loading = false;
  news: any | null = null;
  offlineNews = false;
  src: any;
  video: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private navCrtl: NavController,
    public alertController: AlertController,
    private sanitizer: DomSanitizer,
    private TP: TopicsService,
    public app: ApiProvider) {}

  ionViewDidEnter() {
    this.isInternet = this.app.isOnline();
    // no sleep screen
    this.app.keepAwake();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    // get in server
    this.getData();
  }

  ngOnDestroy() {
    this.app.allowSleep();
  }

  async getData() {
    this.loading = true;
    this.errorMessage = false;
    this.offlineNews = false;
    if (this.app.isOnline()) {
      this.TP.getTopic(this.id).subscribe(res => {
        this.loading = false;
        // contact page
        if (!!res.topic[0].contact_page) {
          return this.router.navigate(['/contact']);
        }

        this.news = res.topic[0];

        //save offline
        this.app.saveNews(res.topic[0], res.section_id);
      }, error => {
        console.log('erro', error);
        this.errorMessage = true;
      })
    } else {
      // Return the cached data from Storage
      this.app.savedNew(this.id).then((result) => {
        this.loading = false;
        this.news = result[0];

        if (this.news) {
          this.offlineNews = true;
        }
      });
    }
  }

  trustHtml(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  share(url) {
    this.app.shareUrl(url);
  }

  update() {
    this.app.updateFont();
  }

  goToBack() {
    this.navCrtl.back();
  }

}
