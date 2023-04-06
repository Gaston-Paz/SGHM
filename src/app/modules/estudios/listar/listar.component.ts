import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { Estudios } from 'src/app/core/interfaces/estudio.interface';
import { ModalImagenComponent } from 'src/app/shared/Components/modal-imagen/modal-imagen.component';
import { ErrorService } from 'src/app/shared/services/error.service';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { EstudiosService } from '../estudios.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit, OnDestroy {

  form!:FormGroup;
  pacientes:Paciente[]=[];
  pacientesFilter: Paciente[] = [];
  estudios: Estudios[]=[];
  estudiosFiltrados: Estudios[]=[];
  filtroPaciente:string = '';
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    "fecha",
    "nombre",
    // "foto",
    "ver"
  ];
  subscribes:any[]=[];
  mail:string='';

  constructor(private _formBuilder:FormBuilder,
    private _servicePaciente:NuevoPacienteService,
    private _spinnerService: NgxSpinnerService,
    private _serviceEstudio:EstudiosService,
    private _serviceError:ErrorService,
    private _dialog: MatDialog,
    private _usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      paciente: [,[Validators.required]]
    });
    this.mail = localStorage.getItem("SGHC-mail")!;
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePaciente.ObtenerPacientes());
    obs.push(this._serviceEstudio.ObtenerEstudios());
    if (this.mail !== null)obs.push(this._usuarioService.GetUsuario(this.mail));
    this.subscribes.push(forkJoin(obs).subscribe(resp => {    
      this.pacientes = resp[0]; 
      this.pacientesFilter = resp[0]; 
      this.estudios = resp[1];    
      if (this.mail !== null){
        this._serviceError.Usuario = resp[2];
        if(this._serviceError.Usuario.rol === "Admin")this._serviceError.Nav = this._serviceError.fillerNav;
        else this._serviceError.Nav = this._serviceError.fillerNav.filter((f:any) => !f.text.toUpperCase().includes('USUARIO'));
        this._serviceError.muestroMenu = true;
      }
      
      if(this._serviceEstudio.paciente.idPaciente !== 0){
        this.form.controls.paciente.setValue(this._serviceEstudio.paciente.idPaciente);
        this.BuscarEstudios();
      }
        
    },(error:HttpErrorResponse) => {
      this._serviceError.Error(error);
    }));
  }

  ngOnDestroy(): void {
    this.subscribes.forEach(s => s.unsubscribe());
  }

  BuscarEstudios(){
    this.estudiosFiltrados = [];
    this.estudios.forEach(e => {
      e.fecha = new Date(e.fecha);    
      if(e.paciente.idPaciente === this.form.controls.paciente.value) this.estudiosFiltrados.push(e);
    });
    this.estudiosFiltrados = this.estudiosFiltrados.sort((a,b)=>{
      if(a.idEstudio > b.idEstudio)return -1;
      else return 1;
    });
    this.dataSource.data = this.estudiosFiltrados;
  }

  applyFilterPaciente(espacio:boolean){
    let filter = this.filtroPaciente + "";
    if(espacio) filter += "";
    this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes));
    if(filter != 'undefined') this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes.filter(x => x.apellido!.toUpperCase().includes(filter.toUpperCase()) || x.nombre!.toUpperCase().includes(filter.toUpperCase()))));
  }

  VerEstudio(element:Estudios){
    const dialogRef = this._dialog.open(ModalImagenComponent, {
      data: {
        element: element
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
  }
}
