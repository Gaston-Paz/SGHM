import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  templateUrl: './no-encontrado.component.html',
  styleUrls: ['./no-encontrado.component.css']
})
export class NoEncontradoComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  Volver(){
    this._router.navigate(['home']);
  }

}
