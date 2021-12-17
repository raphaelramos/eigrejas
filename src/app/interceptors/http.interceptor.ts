import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { ApiProvider } from '../services/api';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  church = null;

  constructor(public authService: AuthService, public app: ApiProvider) {
    this.app.church
    .subscribe(res => {
      if (res) {
        this.church = res;
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // console.log('', this.church)
    if (this.token()) {
      const newRequest = request.clone({ setHeaders: 
        {
          'Authorization': this.token().token_type+" "+this.token().token,
          'X-Tenant': this.church
        }
      });
      return next.handle(newRequest);
    }
    else if (this.church) {
      const newRequest = request.clone({ setHeaders: 
        {
          'X-Tenant': this.church
        }
      });
      return next.handle(newRequest);
    }

    return next.handle(request);

  }

  token() {
    return this.app.token;
  }
}
