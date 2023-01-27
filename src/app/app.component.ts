
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Usuario } from './core/interfaces/usuario.interface';
import { UsuarioService } from './modules/usuario/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './shared/services/error.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SGHC';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  Usuario:Usuario = {
    apellido:'',
    email: '',
    id: 0,
    nombre:'',
    password:'',
    rol:''
  }
  userMail:string = "";
  muestroMenu: boolean = false;
  Nav:any[]=[];
  fillerNav: any = [
    {
      text:'Nuevo Usuario',
      url: 'usuarios/nuevo-usuario'
    },
    {
      text:'Usuarios',
      url: '/usuarios/listar'
    },
    {
      text:'Nuevo Paciente',
      url: '/pacientes/nuevo-paciente'
    },
    {
      text:'Foto de Perfil Paciente',
      url: '/foto/nueva'
    },
    {
      text:'Pacientes',
      url: '/pacientes/listar-pacientes'
    },
    {
      text:'Nueva Consulta TTO',
      url: '/consultas/nueva-consulta'
    },
    {
      text:'Consultas TTO',
      url: '/consultas/listar'
    },
    {
      text:'Nuevos Estudios',
      url: '/estudios/nuevo-estudio'
    },
    {
      text:'Estudios',
      url: '/estudios/listar'
    },
    {
      text:'Cerrar sesión',
      url: '/login'
    },
  ]

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router:Router,
    private _usuarioService:UsuarioService,
    private _serviceError:ErrorService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {   
    this.userMail = localStorage.getItem('SGHC-mail')!;
    this._usuarioService.GetUsuario(this.userMail).subscribe(user => {
      this.Usuario = user;
      if(this.Usuario.rol === "Usuario"){
        this.Nav = this.fillerNav.filter((n: { usuario: any; }) => n.usuario);
      }else{
        this.Nav = this.fillerNav;
      }
    },(error:HttpErrorResponse) => {

    });
  }

  MuestroMenu(){
    this.muestroMenu = !(this.router.url.includes('errores') || this.router.url.includes('login') || this.router.url === '/');
    if(this.muestroMenu){
      if(this.Usuario.rol === "Usuario"){
        this.Nav = this.fillerNav.filter((n: { usuario: any; }) => n.usuario);
      }else{
        this.Nav = this.fillerNav;
      }
    }
    return this.muestroMenu;
  }

}
