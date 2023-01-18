import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { Tratamiento } from 'src/app/core/interfaces/tratamiento.interface';
import { SnackService } from 'src/app/shared/services/snack.service';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';
import { ConsultasService } from './consultas.service';

@Component({
  selector: 'app-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrls: ['./nueva-consulta.component.css']
})
export class NuevaConsultaComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  fecha: Date = new Date();
  pacientes: Paciente[] = [];
  pacientesFilter: Paciente[] = [];
  pipe = new DatePipe('es-ES');
  tratamiento:Tratamiento = {
    especifico:'',
    fecha: new Date(),
    idPaciente: 0,
    motivo: '',
    proximoTurnoIndicado: new Date(),
    sedestacion: '',
    sugerencias: ''
  }
  @Input("alta") alta: boolean = false;
  @Input("paciente") idPaciente: Paciente = {
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
  consulta: Tratamiento = {
    especifico:'',
    fecha: new Date(),
    idPaciente: 0,
    motivo: '',
    proximoTurnoIndicado: new Date(),
    sedestacion: '',
    sugerencias: ''
  }
  filtroPaciente:string = '';
  subscribes:any[]=[];

  constructor(private _formBuilder: FormBuilder,
    private _servicePaciente:NuevoPacienteService,
    private _snackBar: MatSnackBar,
    private _spinnerService: NgxSpinnerService,
    private _serviceConsulta:ConsultasService,
    private _dateAdapter: DateAdapter<Date>,
    private _snack:SnackService) {
      this._dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.fecha = new Date(Date.now());
    this.form = this._formBuilder.group({
      fecha:[,[Validators.required]],
      paciente:[this.idPaciente.idPaciente,[Validators.required]],
      motivo:[,[Validators.required]],
      triangulo:[],
      altura:[],
      barral:[],
      esferas:[],
      especifico:[],
      sugerencias:[],
      sedestacion:[,[Validators.required]],
      proximoTurno:[,[Validators.required]]
    });
    
    this.subscribes.push(this._servicePaciente.ObtenerPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
      this.pacientesFilter = pacientes;
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snack.Mensaje(error.error.message,'error');
    }));

  }

  ngOnDestroy(): void {
    this.subscribes.forEach(s => s.unsubscribe());
  }

  changeDate(date:any,control:number,esAlta:boolean=false){  

    let dateParts = date.value.split('/');
    let fechaInput = new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]).getTime();
    let fecha = new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]);
    if(control === 1)this.form.controls.fecha.setValue(fecha);   
    else if(control === 2)this.form.controls.proximoTurno.setValue(fecha);
    
    this.consulta.proximoTurnoIndicado = new Date(fecha);
    
    if(esAlta)this.SetConsultaAlta();
  }

  GuardarConsulta(){
    this.MapTratamiento();
    
    this.subscribes.push(this._serviceConsulta.GuardarConsultas(this.tratamiento).subscribe(resp => {
      this._snack.Mensaje("El tratamiento se guardó con éxito",'success');
      this.form.reset();
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snack.Mensaje(error.error.message,'error');
    }));
    
  }

  MapTratamiento(){
    this.tratamiento.fecha = this.form.controls.fecha.value;
    this.tratamiento.idPaciente = this.form.controls.paciente.value;
    this.tratamiento.paciente = this.pacientes.find(x => x.idPaciente === this.tratamiento.idPaciente);
    this.tratamiento.motivo = this.form.controls.motivo.value;
    this.tratamiento.trianguloDeTalla = this.form.controls.triangulo.value;
    this.tratamiento.alturaDeIliacos = this.form.controls.altura.value;
    this.tratamiento.barral = this.form.controls.barral.value;
    this.tratamiento.esferas = this.form.controls.esferas.value;
    this.tratamiento.especifico = this.form.controls.especifico.value;
    this.tratamiento.sedestacion = this.form.controls.sedestacion.value;
    this.tratamiento.proximoTurnoIndicado = this.form.controls.proximoTurno.value;
    this.tratamiento.sugerencias = this.form.controls.sugerencias.value;
  }

  SetConsultaAlta(){
    this._servicePaciente.consulta = this.consulta;
    if(this.consulta.sedestacion !== '' && this.consulta.especifico !== '' &&
    this.consulta.sugerencias !== '')this._servicePaciente.tratamientoCompleto = true;
  }

  applyFilterPaciente(espacio:boolean){
    let filter = this.filtroPaciente + "";
    if(espacio) filter += "";
    this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes));
    if(filter != 'undefined') this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes.filter(x => x.apellido.toUpperCase().includes(filter.toUpperCase()) || x.nombre.toUpperCase().includes(filter.toUpperCase()))));
  }

}
