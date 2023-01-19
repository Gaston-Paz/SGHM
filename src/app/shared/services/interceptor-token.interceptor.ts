import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptorTokenInterceptor implements HttpInterceptor {

  constructor(private _authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._authService.GetToken();

    if(token){
      const cloned = request.clone({
        headers: request.headers.set('Authorization','Bearer ' + token)
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
