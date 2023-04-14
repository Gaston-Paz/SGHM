import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { SnackService } from './snack.service';

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
  recargo:boolean = true;
  public Nav: any[] = [];
  public fillerNav: any = [
    {
      text: "Nuevo Usuario",
      url: "home/usuarios/nuevo-usuario",
    },
    {
      text: "Usuarios",
      url: "home/usuarios/listar-usuarios",
    },
    {
      text: "Nuevo Paciente",
      url: "home/pacientes/nuevo-paciente",
    },
    {
      text: "Foto de Perfil Paciente",
      url: "home/foto/nueva",
    },
    {
      text: "Pacientes",
      url: "home/pacientes/listar-pacientes",
    },
    {
      text: "Nueva Consulta TTO",
      url: "home/consultas/nueva-consulta",
    },
    {
      text: "Consultas TTO",
      url: "home/consultas/listar-consultas",
    },
    {
      text: "Nuevos Estudios",
      url: "home/estudios/nuevo-estudio",
    },
    {
      text: "Estudios",
      url: "home/estudios/listar-estudios",
    },
    {
      text: "Cerrar sesión",
      url: "/login",
    },
  ];
  public rol:string = '';

  constructor(private _router:Router,
    private _snackService: SnackService) { }

  Error(error:HttpErrorResponse){
    if(error.status === 403){
      this._router.navigate(['errores/403']);
    }else if(error.status === 404){
      this._router.navigate(['errores/404']);
    }else this._snackService.Mensaje(error.error.message,'error');
  }

}
