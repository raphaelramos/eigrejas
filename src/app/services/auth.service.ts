import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs/Operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { ApiProvider } from './api'
import { AlertService } from './alert.service';

import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = environment.base;

  constructor(
    private http: HttpClient,
    private app: ApiProvider,
    private alertService: AlertService
  ) {}

  isLoggedIn() {
    const token = this.app.token;
    return token != null
  }

  login(credentials: { email: string, password: string, device_name: string }) {
    return this.http.post(this.BASE_URL + '/api/v1/auth/login', credentials).pipe(
      tap(async token => {
        const key = 'token';
        const value = JSON.stringify(token);
        
        await Storage.set({
          key: key,
          value: value,
        });

        this.app.token = token;

        return token;
      }),
    );
  }

  register(credentials: { name: String, last_name: String, email: String, phone: String, password: String, password_confirmation: String }) {
    return this.http.post(this.BASE_URL + '/api/v1/user', credentials)
      .pipe(take(1));
  }

  recovery(credentials: { email: string }) {
    return this.http.post<any>(this.BASE_URL + '/api/v1/auth/recovery', credentials)
      .pipe(take(1));
  }

  logout() {
    let credentials: { };
    this.http.post(this.BASE_URL + '/api/v1/auth/logout', credentials)
      .pipe(take(1));
    
    Storage.remove({ key: 'token' });
    Storage.remove({ key: 'user' });

    this.app.token = null;
    this.app.userData$.next(null);

    this.alertService.presentToast("Você saiu");

    return true;
  }

  user(token) {
    const headerDict = {
      'Authorization': token.token_type+" "+token.token
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    
    return this.http.get<User>(this.BASE_URL + '/api/v1/auth/me', requestOptions)
      .pipe(take(1));
  }
}