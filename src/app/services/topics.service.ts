import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { ApiProvider } from './api';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(
    public app: ApiProvider,
    public http: HttpClient
  ) { }

  lang() {
    if (this.app.language) {
      return this.app.language;
    }
    return '';
  }

  getHome(): any {
    return this.http.get( `${this.app.BASE_URL}/api/v1/home/${this.lang()}`).pipe(retry(2));
  }

  getTopics(topic, page = 1, count = 12): any {
    return this.http.get( `${this.app.BASE_URL}/api/v1/topics/${topic}/page/${page}/count/${count}/${this.lang()}`);
  }

  getTopic(topic_id): any {
    return this.http.get( `${this.app.BASE_URL}/api/v1/topic/${topic_id}/${this.lang()}`);
  }

  getChannelTopic(topic_id, max): any {
    return this.http.get( `${this.app.BASE_URL}/api/v1/youtube/${topic_id}/${max}/${this.lang()}`);
  }

  getPostbySlug(slug): any {
    return this.http.get( `${this.app.BASE_URL}/api/v1/slug/${slug}/${this.lang()}`);
  }

  postContact(values: { contact_name: String, contact_subject: String, contact_message: String, contact_email: String }): any {
    return this.http.post( `${this.app.BASE_URL}/api/v1/contact/`, values);
  }

  ytThumb(url) {
    const id = url.split('=')[1]
    if (id) {
      return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
    }
  }
}
