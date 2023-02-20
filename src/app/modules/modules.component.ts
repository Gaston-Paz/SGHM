import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../core/interfaces/usuario.interface';
import { ErrorService } from '../shared/services/error.service';
import { UsuarioService } from './usuario/usuario.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  usuario:Usuario={
    apellido:'',
    email:'',
    nombre:'',
    password:'',
    rol:''
  };
  mail:string="";

  constructor(public _errorService:ErrorService,
    private _router:Router,
    private _usuarioService:UsuarioService) {
    this._errorService.muestroMenu = true;
  }

  ngOnInit(): void {  
    this._errorService.muestroMenu = true;
    this.mail = localStorage.getItem("SGHC-mail")!;
    if (this.mail !== null) {
      this._usuarioService.GetUsuario(this.mail).subscribe(
        (user) => {
          this.usuario = user;
        },
        (error: HttpErrorResponse) => {
          this._errorService.Error(error);
        }
      );
    }
  }

}
