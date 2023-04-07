import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { Tratamiento } from 'src/app/core/interfaces/tratamiento.interface';
import { ErrorService } from 'src/app/shared/services/error.service';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { ConsultasService } from '../nueva-consulta/consultas.service';
@Component({
  selector: 'app-listar-consultas',
  templateUrl: './listar-consultas.component.html',
  styleUrls: ['./listar-consultas.component.css']
})
export class ListarConsultasComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['fecha', 'motivo', 'sedestacion','sugerencias','edit'];
  pacientes:Paciente[]=[];
  pacientesFilter: Paciente[] = [];
  tratamientos:Tratamiento[]=[];
  tratamientosFiltrados:Tratamiento[]=[];
  paciente: Paciente = {
    apellido: "",
    celular: "",
    fechaNacimiento: new Date(),
    email: "",
    nacio: "",
    nombre: "",
    ocupacion: "",
    localidad: "",
    otros:"",
    deParte: ""
  };
  form!:FormGroup;
  filtroPaciente:string = '';
  subscribes:any[]=[];
  mail:string='';

  @Output('ocultarTratamientos')ocultarTratamientos = new EventEmitter<Paciente>();

  constructor(private _servicePaciente:NuevoPacienteService,
    private _spinnerService: NgxSpinnerService,
    private _serviceTratamiento:ConsultasService,
    private _formBuilder:FormBuilder,
    private _serviceError:ErrorService,
    private _router:Router,
    private _usuarioService: UsuarioService) { }

  ngOnDestroy(): void {
    this.subscribes.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {    
    this.form = this._formBuilder.group({
      paciente: [this._serviceTratamiento.paciente.idPaciente !== undefined && this._serviceTratamiento.paciente.idPaciente !== null ? this._serviceTratamiento.paciente.idPaciente : this.paciente.idPaciente]
    });
    this.mail = localStorage.getItem("SGHC-mail")!;
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePaciente.ObtenerPacientes());
    obs.push(this._serviceTratamiento.ObtenerConsultas());
    if (this.mail !== null) obs.push(this._usuarioService.GetUsuario(this.mail));
    this.subscribes.push(forkJoin(obs).subscribe(resp => {    
      this.pacientes = resp[0];
      this.pacientesFilter = resp[0];
      this.tratamientos = resp[1];
      this.tratamientos.forEach(t => {
        let fecha = new Date(t.fecha!);
        fecha.setHours(fecha.getHours()+3);
        t.fecha = fecha;

        if(t.proximoTurnoIndicado){
          let proximoTurnoIndicado = new Date(t.proximoTurnoIndicado);
          proximoTurnoIndicado.setHours(proximoTurnoIndicado.getHours()+3);
          t.proximoTurnoIndicado = proximoTurnoIndicado;
        }

      });
      if((this._serviceTratamiento.paciente.idPaciente !== undefined || this._serviceTratamiento.paciente.idPaciente !== null || this._serviceTratamiento.paciente.idPaciente! !== 0)) {
        this.form.controls.paciente.setValue(this._serviceTratamiento.paciente.idPaciente!);
        this.buscarTratamientos();
        this._serviceTratamiento.editartto = {
          fecha: new Date(),
          idPaciente: 0,
          motivo: "",
          sedestacion: "",
          paciente:{
            apellido:'',
            celular:'',
            deParte:'',
            email:'',
            fechaNacimiento: new Date(),
            localidad:'',
            nacio:'',
            nombre:'',
            ocupacion:'',
            otros:''
          }
        };
      }

      if (this.mail !== null){
        this._serviceError.Usuario = resp[2];
          if(this._serviceError.Usuario.rol === "Admin")this._serviceError.Nav = this._serviceError.fillerNav;
          else this._serviceError.Nav = this._serviceError.fillerNav.filter((f:any) => !f.text.toUpperCase().includes('USUARIO'));
          this._serviceError.muestroMenu = true;
      }
      
    },(error:HttpErrorResponse) => {
      this._serviceError.Error(error);
    }));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buscarTratamientos(){
    this.paciente = this.pacientes.find(x => x.idPaciente === this._serviceTratamiento.paciente.idPaciente)!;
    this.tratamientosFiltrados = [];
    this.tratamientos.forEach(t => {
      if(t.paciente?.idPaciente === this.form.controls.paciente.value)this.tratamientosFiltrados.push(t);
    });
    this.dataSource.data = this.tratamientosFiltrados.sort((a,b) => {
      if(a.fecha! > b.fecha!)return -1;
      else return 1;
    });        
  }

  applyFilterPaciente(espacio:boolean){
    let filter = this.filtroPaciente + "";
    if(espacio) filter += "";
    this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes));
    if(filter != 'undefined') this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes.filter(x => x.apellido!.toUpperCase().includes(filter.toUpperCase()) || x.nombre!.toUpperCase().includes(filter.toUpperCase()))));
  }

  EditarTto(element:Tratamiento){       
    this._serviceTratamiento.paciente = {
        apellido:'',
        celular:'',
        deParte:'',
        email:'',
        fechaNacimiento: new Date(),
        localidad:'',
        nacio:'',
        nombre:'',
        ocupacion:'',
        otros:''
    };
    this._serviceTratamiento.editartto = element;
    this._router.navigate(['home/consultas/nueva-consulta']);
  }

  NuevaConsulta(element:number){
    let paciente = this.pacientes.find(x => x.idPaciente === element);
    this.ocultarTratamientos.emit(paciente);
  }

}
