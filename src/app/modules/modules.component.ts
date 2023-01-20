import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent  {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  listarPaciente:boolean=false;
  nuevoPaciente:boolean=false;
  fotoPerfil:boolean=false;
  nuevaConsulta:boolean=false;
  listarConsultas:boolean=false;
  nuevoEstudio:boolean=false;
  listarEstudios:boolean=false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  fillerNav: any = [
    {
      text:'Nuevo Médico',
      url: '',
      id:1
    },
    {
      text:'Médicos',
      url: '',
      id:2
    },
    {
      text:'Nuevo Paciente',
      url: '/pacientes/nuevo-paciente',
      id:3
    },
    {
      text:'Foto de Perfil Paciente',
      url: '/foto/foto-perfil',
      id:4
    },
    {
      text:'Pacientes',
      url: '/pacientes/listar-pacientes',
      id:5
    },
    {
      text:'Nueva Consulta TTO',
      url: '/consultas/nueva-consulta',
      id:6
    },
    {
      text:'Consultas TTO',
      url: '/consultas/listar-consultas',
      id:7
    },
    {
      text:'Nuevos Estudios',
      url: '/estudios/estudios',
      id:8
    },
    {
      text:'Estudios',
      url: '/estudios/listar-estudios',
      id:9
    },
    {
      text:'Cerrar sesión',
      url: '',
      id:10
    },
  ]

  navegar(ev:any){
      if(ev.id === 3){
        this.listarPaciente = false;
        this.nuevoPaciente = true;
        this.fotoPerfil = false;
        this.nuevaConsulta = false;
        this.listarConsultas = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
      }else if(ev.id === 4){
        this.fotoPerfil = true;
        this.listarPaciente = false;
        this.nuevaConsulta = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
      }else if(ev.id === 5){
        this.fotoPerfil = false;
        this.listarPaciente = true;
        this.nuevoPaciente = false;
        this.nuevaConsulta = false;
        this.listarConsultas = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
      }else if(ev.id === 6){
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
        this.nuevaConsulta = true;
      }else if(ev.id === 7){
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = true;
        this.nuevaConsulta = false;
        this.nuevoEstudio = false;
        this.listarEstudios = false;
      }else if(ev.id === 8){
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevaConsulta = false;
        this.listarEstudios = false;
        this.nuevoEstudio = true;
      }else if(ev.id === 9){
        this.fotoPerfil = false;
        this.listarPaciente = false;
        this.nuevoPaciente = false;
        this.listarConsultas = false;
        this.nuevaConsulta = false;
        this.listarEstudios = true;
        this.nuevoEstudio = false;
      }else if(ev.id === 10){
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      }
  }

}
