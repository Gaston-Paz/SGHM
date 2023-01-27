import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-autorizado',
  templateUrl: './no-autorizado.component.html',
  styleUrls: ['./no-autorizado.component.css']
})
export class NoAutorizadoComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  Volver(){
    this._router.navigate(['login']);
  }

}
