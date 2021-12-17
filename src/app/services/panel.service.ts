import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    return this.http.get(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}/${page}/${results}/${search}`, { headers });
  }

  get(model, id): any {
    return this.http.get(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}/${id}`);
  }

  post(model, values): any {
    return this.http.post(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}`, values);
  }

  delete(model, id): any {
    return this.http.delete(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}/${id}`);
  }

  getFilters(filters): any {
    return this.http.get(`${this.app.BASE_URL}/${this.PANEL_URL}/filters/${filters}`);
  }

  postStatus(model, value): any {
    return this.http.post(`${this.app.BASE_URL}/${this.PANEL_URL}/${model}-status`, value);
  }

  putMemberRel(id_member, id_rel, type): any {
    return this.http.put(`${this.app.BASE_URL}/${this.PANEL_URL}/members-relationships/${id_member}/${id_rel}/${type}`, null);
  }
}
