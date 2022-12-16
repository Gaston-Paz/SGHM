import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private _spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    this._spinnerService.ShowSpinner();
    return next.handle(req).pipe(
      finalize(() => this._spinnerService.HideSpinner())
    );
  }
}
