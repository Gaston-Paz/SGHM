import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Usuario } from '../core/interfaces/usuario.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackService } from '../shared/services/snack.service';
import { UsuarioService } from './usuario/usuario.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  listarPaciente:boolean=false;
  nuevoPaciente:boolean=false;
  fotoPerfil:boolean=false;
  nuevaConsulta:boolean=false;
  listarConsultas:boolean=false;
  nuevoEstudio:boolean=false;
  listarEstudios:boolean=false;
  nuevoUsuario:boolean=false;
  listarUsuario:boolean=false;
  userMail:string = "";
  Usuario:Usuario = {
    apellido:'',
    email: '',
    id: 0,
    nombre:'',
    password:'',
    rol:''
  }

  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private router:Router,
    private _authService:AuthService,
    private _snack:SnackService,
    private _usuarioService:UsuarioService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {   
    this.userMail = localStorage.getItem('SGHC-mail')!;
    this._usuarioService.GetUsuario(this.userMail).subscribe(user => {
      this.Usuario = user;
      if(this.Usuario.rol === "Usuario"){
        this.fillerNav = this.Nav.filter((n: { usuario: any; }) => n.usuario);
      }else{
        this.fillerNav = this.Nav;
      }
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snack.Mensaje(error.message,'error');
    });
  }

  Nav: any = [
    {
      text:'Nuevo Usuario',
      id:1,
      usuario:false
    },
    {
      text:'Usuarios',
      id:2,
      usuario:false
    },
    {
      text:'Nuevo Paciente',
      id:3,
      usuario:true
    },
    {
      text:'Foto de Perfil Paciente',
      id:4,
      usuario:true
    },
    {
      text:'Pacientes',
      id:5,
      usuario:true
    },
    {
      text:'Nueva Consulta TTO',
      id:6,
      usuario:true
    },
    {
      text:'Consultas TTO',
      id:7,
      usuario:true
    },
    {
      text:'Nuevos Estudios',
      id:8,
      usuario:true
    },
    {
      text:'Estudios',
      id:9,
      usuario:true
    },
    {
      text:'Cerrar sesión',
      id:10,
      usuario:true
    },
  ]
  fillerNav: any[] = [];

  navegar(ev:any){
      if(ev.id === 3){
        this.nuevoUsuario = false;
        this.listarPaciente = false;
        this.nuevoPaciente = true;
        this.fotoPerfil = false;
        this.nuevaConsulta = false;
        this.listarConsultas = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
        this.listarUsuario = false;
      }else if(ev.id === 4){
        this.nuevoUsuario = false;
        this.fotoPerfil = true;
        this.listarPaciente = false;
        this.nuevaConsulta = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
        this.listarUsuario = false;
      }else if(ev.id === 5){
        this.nuevoUsuario = false;
        this.fotoPerfil = false;
        this.listarPaciente = true;
        this.nuevoPaciente = false;
        this.nuevaConsulta = false;
        this.listarConsultas = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
        this.listarUsuario = false;
      }else if(ev.id === 6){
        this.nuevoUsuario = false;
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
        this.nuevaConsulta = true;
        this.listarUsuario = false;
      }else if(ev.id === 7){
        this.nuevoUsuario = false;
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = true;
        this.nuevaConsulta = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
        this.listarUsuario = false;
      }else if(ev.id === 8){
        this.nuevoUsuario = false;
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevaConsulta = false;
        this.listarEstudios = false;
        this.nuevoEstudio = true;
        this.listarUsuario = false;
      }else if(ev.id === 9){
        this.nuevoUsuario = false;
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevaConsulta = false;
        this.listarEstudios = true;
        this.nuevoEstudio = false;
        this.listarUsuario = false;
      }else if(ev.id === 10){
        this.CleanLocalStorage();
      }else if(ev.id === 1){
        this.nuevoUsuario = true;
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevaConsulta = false;
        this.listarEstudios = false;
        this.nuevoEstudio = false;
        this.listarUsuario = false;
      }else if(ev.id === 2){
        this.nuevoUsuario = false;
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevaConsulta = false;
        this.listarEstudios = false;
        this.nuevoEstudio = false;
        this.listarUsuario = true;
      }
  }
  
  CleanLocalStorage(){
    localStorage.removeItem('SGHC-token');
    localStorage.removeItem('SGHC-mail');
    this.router.navigate(['login']);
  }

}
