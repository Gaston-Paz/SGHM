import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  count:number = 0;
  
  constructor(private _spinnerService:NgxSpinnerService) { }

  ShowSpinner(){
    this.count++;
    this._spinnerService.show();
  }

  HideSpinner(){
    if(this.count === 1){
      this._spinnerService.hide();
      this.count = 0;
    }else{
      this.count--;
    }
  }
}
