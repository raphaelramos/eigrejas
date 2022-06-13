import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/Operators';

import { ApiProvider } from './api';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  PANEL_URL = 'api/v1/panel';

  constructor(
    public app: ApiProvider,
    public http: HttpClient
  ) { }

  getIndex(model, page, results, search?, filters?): any {
    console.log('filters', filters)
    let headers = null;
    if (filters) {
      headers = new HttpHeaders({
        filters: JSON.stringify(filters)
      });
    }

    return this.http.get(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}/${page}/${results}/${search}`, { headers })
      .pipe(take(1));
  }

  get(model, id): any {
    return this.http.get(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}/${id}`)
      .pipe(take(1));
  }

  post(model, values): any {
    return this.http.post(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}`, values)
      .pipe(take(1));
  }

  delete(model, id): any {
    return this.http.delete(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}/${id}`)
      .pipe(take(1));
  }

  getFilters(filters): any {
    return this.http.get(`${this.app.BASE_URL}/${this.PANEL_URL}/filters/${filters}`)
      .pipe(take(1));
  }

  postStatus(model, value): any {
    return this.http.post(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}-status`, value)
      .pipe(take(1));
  }

  putMemberRel(id_member, id_rel, type): any {
    return this.http.put(`${this.app.BASE_URL}/${this.PANEL_URL}/members-relationships/${id_member}/${id_rel}/${type}`, null)
      .pipe(take(1));
  }
}
