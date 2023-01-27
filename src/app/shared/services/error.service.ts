import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackService } from './snack.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private _router:Router,
    private _snack: SnackService) { }

  Error(error:HttpErrorResponse){
    console.log(error);
    if(error.status === 403){
      this._router.navigate(['login']);
    }else{
      this._snack.Mensaje(error.error.message,'error');
    }
  }
}
