import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicsService } from 'src/app/services/topics.service'

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.page.html',
  styleUrls: ['./video-list.page.scss'],
})
export class VideoListPage implements OnInit {

  images;
  title;
  loading = false;
  constructor(private TP: TopicsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.loading = true;
      this.title = data.name;

      this.TP.getTopics(data.id).subscribe(res => {
        this.loading = false;
        this.images = res.topics;
        this.title = res.section_title;
      }, error => {});
    });
  }

  goToVideo(id) {
    this.router.navigate(['/video', id]);
  }

  ytThumb(url) {
    return this.TP.ytThumb(url);
  }

}
