import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-fatal',
  templateUrl: './fatal.component.html',
  styleUrls: ['./fatal.component.css']
})
export class FatalComponent implements OnInit {

  fatal:string='';

  constructor(private _router:Router,
    private _serviceError:ErrorService) { 
      this._serviceError.muestroMenu = false;
    }

  ngOnInit(): void {
    this.fatal = this._serviceError.errorFatal;
  }

  Volver(){
    this._router.navigate(['home']);
  }

}
