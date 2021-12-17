import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiProvider } from './api';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  REPORT_URL = 'api/v1/panel/report';

  constructor(
    public app: ApiProvider,
    public http: HttpClient
  ) { }

  getIndex(filters?): any {
    let headers = null;
    if (filters) {
      headers = new HttpHeaders({
        filters: JSON.stringify(filters)
      });
    }

    return this.http.get(`${this.app.BASE_URL}/${this.REPORT_URL}`, { headers });
  }

  getDate(date, filters?): any {
    let headers = null;
    if (filters) {
      headers = new HttpHeaders({
        filters: JSON.stringify(filters)
      });
    }
    
    return this.http.get(`${this.app.BASE_URL}/${this.REPORT_URL}-group/${date}`, { headers });
  }
}
