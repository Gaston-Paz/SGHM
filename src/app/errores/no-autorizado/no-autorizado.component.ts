import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-no-autorizado',
  templateUrl: './no-autorizado.component.html',
  styleUrls: ['./no-autorizado.component.css']
})
export class NoAutorizadoComponent implements OnInit {

  constructor(private _router:Router,
    public _serviceError:ErrorService) { 
      this._serviceError.muestroMenu = false;
    }

  ngOnInit(): void {
    
  }

  Volver(){
    this._router.navigate(['login']);
  }

}
