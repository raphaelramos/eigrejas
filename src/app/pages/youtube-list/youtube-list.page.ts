import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { TopicsService } from 'src/app/services/topics.service'

import { ApiProvider } from 'src/app/services/api';

import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-youtube-list',
  templateUrl: './youtube-list.page.html',
  styleUrls: ['./youtube-list.page.scss'],
})
export class YoutubeListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  title: string;
  videos: any = [];
  channelID: string;
  maxResults = '14';
  pageToken: string;
  googleToken: string = this.app.GOOGLE_API;
  get = 1;
  searchQuery = '';
  errorMessage = false;
  loading = false;
  skeletons = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]; //qtd loading

  constructor(private TP: TopicsService, 
    public app: ApiProvider,
    private route: ActivatedRoute) {}

  url() {
    return'https://www.googleapis.com/youtube/v3/search?order=date&part=id,snippet&channelId='
    + this.channelID + '&type=video&maxResults=' + this.maxResults + '&key=' + this.googleToken;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.loading = true;
      this.title = data.name;

      this.TP.getChannelTopic(data.id, this.maxResults).subscribe(res => {
        this.loading = false;
        this.videos = res.details.items;
        this.channelID = res.channel;
        this.pageToken = res.details.nextPageToken;
      }, error => {});
    });
  }

  doInfinite(event: any) {
    const url = `${this.url()}&q=${this.searchQuery}&pageToken=${this.pageToken}`;

    return Http.request({
      method: 'GET',
      url: url,
    })
    .then(({ data }) => {
      this.videos = [...this.videos, ...data.items];

      this.pageToken = data.nextPageToken;
      if (!data.nextPageToken) {
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }

  goToYoutube(id) {
    this.app.openUrlApp(`https://www.youtube.com/watch?v=${id}`);
  }

  ytThumb(url) {
    return this.TP.ytThumb(url);
  }

}
