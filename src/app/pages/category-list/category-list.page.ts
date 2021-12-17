import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

import { TopicsService } from 'src/app/services/topics.service';
import { ApiProvider } from 'src/app/services/api';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  id;
  title;
  topics = [];
  loading = false;
  errorMessage = false;
  isInternet = true;
  page = 1;
  completed = false;

  constructor(private TP: TopicsService,
    public app: ApiProvider,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.loading = true;
      this.title = data.name;
      this.id = data.id;

      this.load();
    });
  }

  ionViewDidEnter() {
    if (this.isInternet != this.app.isOnline()) {
      this.load();
    }
  }

  load() {
    this.errorMessage = false;
    this.loading = true;

    this.TP.getTopics(this.id).subscribe(res => {
      this.loading = false;
      this.topics = res.topics;
      this.title = res.section_title;
    }, error => {
      this.errorMessage = true;
      this.loading = false;
    });
  }

  loadMore(event) {
    this.page++;

    this.TP.getTopics(this.id, this.page).subscribe(res => {
      this.topics = [...this.topics, ...res.topics];
      event.target.complete();

      // Disable infinite loading when maximum reached
      if (res.topics_count && res.topics_count == 0) {
        event.target.disabled = true;
        this.completed = true;
      }
    });
  }

  goToPost(id) {
    this.router.navigate(['/post/', id]);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

}
