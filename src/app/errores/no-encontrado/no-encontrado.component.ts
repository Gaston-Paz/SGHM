import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-no-encontrado',
  templateUrl: './no-encontrado.component.html',
  styleUrls: ['./no-encontrado.component.css']
})
export class NoEncontradoComponent implements OnInit {

  constructor(private _router:Router,
    public _serviceError:ErrorService) { 
      this._serviceError.muestroMenu = false;
    }

  ngOnInit(): void {
    
  }

  Volver(){
    this._router.navigate(['home']);
  }

}
