import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  id;
  title = 'Vídeo';
  loading = true;
  video;

  constructor(private TP: TopicsService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.TP.getTopic(this.id).subscribe(res => {
      this.video = res.topic[0];
      this.loading = false;
    }, error => {});
  }

  ytThumb(url) {
    return this.TP.ytThumb(url);
  }

  youtubeUrl(url) {
    const id = url.split('=')[1]
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`);
  }

  vimeoUrl(url) {
    const id = url.split('com/')[1]
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${id}`);
  }

  trustHtml(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  goTovideoList(val) {
    const navData: NavigationExtras = {
      queryParams: {
        id: val
      }
    };
    this.router.navigate(['/video-list'], navData);
  }

}
