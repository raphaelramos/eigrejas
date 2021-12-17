import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiProvider } from './api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public app: ApiProvider,
    public http: HttpClient
  ) { }

  getSettings(): any {
    return this.http.get( `${this.app.BASE_URL}/api/v1/website/settings`);
  }

  getChurches(search): any {
    return this.http.get( `${this.app.BASE_URL}/api/churches/${search}`);
  }

  getChurchesDomain(domain): any {
    return this.http.get( `${this.app.BASE_URL}/api/churches/domain/${domain}`);
  }

  getChurchesCheckDomain(domain): any {
    return this.http.get( `${this.app.BASE_URL}/api/churches/check/${domain}`);
  }

  postChurch(values): any {
    return this.http.post( `${this.app.BASE_URL}/api/church/`, values);
  }

  plans(values): any {
    return this.http.post( `${this.app.BASE_URL}/api/plans/`, values);
  }

  getGeo(country_id): any {
    return this.http.get( `${this.app.BASE_URL}/api/geo/index/${country_id}`);
  }

  getCountries(): any {
    return this.http.get( `${this.app.BASE_URL}/api/geo/countries`);
  }

  getStates(country_id): any {
    return this.http.get( `${this.app.BASE_URL}/api/geo/states/${country_id}`);
  }

  getCities(state_id): any {
    return this.http.get( `${this.app.BASE_URL}/api/geo/cities/${state_id}`);
  }

}
