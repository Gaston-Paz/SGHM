import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../shared/services/error.service';
import { UsuarioService } from './usuario/usuario.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  mail:string="";

  constructor(public _errorService:ErrorService,
    private _router:Router,
    private _usuarioService:UsuarioService) {
  }

  ngOnInit(): void {  
    this.mail = localStorage.getItem("SGHC-mail")!;
    if (this.mail !== null) {
      this._usuarioService.GetUsuario(this.mail).subscribe(
        (user) => {
          this._errorService.Usuario = user;
          if(this._errorService.Usuario.rol === "Admin")this._errorService.Nav = this._errorService.fillerNav;
          else this._errorService.Nav = this._errorService.fillerNav.filter((f:any) => !f.text.toUpperCase().includes('USUARIO'));
          this._errorService.muestroMenu = true;
          this._errorService.rol = user.rol;
        },
        (error: HttpErrorResponse) => {
          this._errorService.Error(error);
        }
      );
    }
  }

}
