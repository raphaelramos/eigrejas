import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/Operators';

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
    return this.http.get( `${this.app.BASE_URL}/api/v1/website/settings`)
      .pipe(take(1));
  }

  getChurches(search): any {
    return this.http.get( `${this.app.BASE_URL}/api/churches/${search}`)
      .pipe(take(1));
  }

  getChurchesDomain(domain): any {
    return this.http.get( `${this.app.BASE_URL}/api/churches/domain/${domain}`)
      .pipe(take(1));
  }

  getChurchesCheckDomain(domain): any {
    return this.http.get( `${this.app.BASE_URL}/api/churches/check/${domain}`)
      .pipe(take(1));
  }

  postChurch(values): any {
    return this.http.post( `${this.app.BASE_URL}/api/church/`, values)
      .pipe(take(1));
  }

  plans(values): any {
    return this.http.post( `${this.app.BASE_URL}/api/plans/`, values)
      .pipe(take(1));
  }

  getGeo(country_id): any {
    return this.http.get( `${this.app.BASE_URL}/api/geo/index/${country_id}`)
      .pipe(take(1));
  }

  getCountries(): any {
    return this.http.get( `${this.app.BASE_URL}/api/geo/countries`)
      .pipe(take(1));
  }

  getStates(country_id): any {
    return this.http.get( `${this.app.BASE_URL}/api/geo/states/${country_id}`)
      .pipe(take(1));
  }

  getCities(state_id): any {
    return this.http.get( `${this.app.BASE_URL}/api/geo/cities/${state_id}`)
      .pipe(take(1));
  }

}
