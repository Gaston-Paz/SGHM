import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public errorFatal:string='';
  public muestroMenu:boolean = true;
  public Usuario: Usuario = {
    apellido:'',
    email:'',
    nombre:'',
    password:'',
    rol:''
  }
  public Nav: any[] = [];

  constructor(private _router:Router) { }

  Error(error:HttpErrorResponse){
    console.log(error);
    if(error.status === 403){
      this._router.navigate(['errores/403']);
    }else if(error.status === 404){
      this._router.navigate(['errores/404']);
    }else{
      console.log(error);
      
      this.errorFatal = error.error.message;
      this._router.navigate(['errores/500']);
    }
  }
}
