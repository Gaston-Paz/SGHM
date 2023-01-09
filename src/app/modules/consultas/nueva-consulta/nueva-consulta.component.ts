import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { Tratamiento } from 'src/app/core/interfaces/tratamiento.interface';
import { SnackBarComponent } from 'src/app/shared/Components/snack-bar/snack-bar.component';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';
import { ConsultasService } from './consultas.service';

@Component({
  selector: 'app-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrls: ['./nueva-consulta.component.css']
})
export class NuevaConsultaComponent implements OnInit {
  form!: FormGroup;
  fecha: Date = new Date();
  pacientes: Paciente[] = [];
  pipe = new DatePipe('es-ES');
  tratamiento:Tratamiento = {
    idPaciente:0,
    fecha: new Date(),
    motivo:'',
    trianguloDeTalla:'',
    alturaDeIliacos:'',
    barral:'',
    esferas:'',
    especifico:'',
    sedestacion:'',
    proximoTurnoIndicado: new Date()
  }

  constructor(private _formBuilder: FormBuilder,
    private _servicePaciente:NuevoPacienteService,
    private _snackBar: MatSnackBar,
    private _spinnerService: NgxSpinnerService,
    private _serviceConsulta:ConsultasService,
    private _dateAdapter: DateAdapter<Date>) {
      this._dateAdapter.setLocale('es-ES');
     }

  ngOnInit(): void {
    this.fecha = new Date(Date.now());
    this.form = this._formBuilder.group({
      fecha:[,[Validators.required]],
      paciente:[,[Validators.required]],
      motivo:[,[Validators.required]],
      triangulo:[,[Validators.required]],
      altura:[,[Validators.required]],
      barral:[,[Validators.required]],
      esferas:[,[Validators.required]],
      especifico:[,[Validators.required]],
      sedestacion:[,[Validators.required]],
      proximoTurno:[,[Validators.required]]
    });
    this._servicePaciente.ObtenerPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: {
          mensaje: error.error.message,
        },
        horizontalPosition: "center",
        panelClass: "error",
      });
    });

  }

  changeDate(date:any,control:number){
    // let fechaaux = new Date(date.value);
    // let fechas = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()));
    // let fecha = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()+1));
    // if(control === 1)this.form.controls.fecha.setValue(fechas);   
    // else if(control === 2)this.form.controls.proximoTurno.setValue(fechas);   

    let dateParts = date.value.split('/');
    let fechaInput = new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]).getTime();
    let fecha = new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]);
    let fechaMostrar = new Date(fechaInput).toLocaleDateString();
    if(control === 1)this.form.controls.fecha.setValue(fecha);   
    else if(control === 2)this.form.controls.proximoTurno.setValue(fecha);   
  }

  GuardarConsulta(){
    this.MapTratamiento();
    
    this._serviceConsulta.GuardarConsultas(this.tratamiento).subscribe(resp => {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: {
          mensaje: "El tratamiento se guardó con éxito",
        },
        horizontalPosition: "center",
        panelClass: "success",
      });
      this.form.reset();
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: {
          mensaje: error.error.message,
        },
        horizontalPosition: "center",
        panelClass: "error",
      });
    })
    
  }

  MapTratamiento(){
    this.tratamiento.fecha = this.form.controls.fecha.value;
    this.tratamiento.paciente = this.form.controls.paciente.value;
    this.tratamiento.idPaciente = this.tratamiento.paciente!.idPaciente!;
    this.tratamiento.motivo = this.form.controls.motivo.value;
    this.tratamiento.trianguloDeTalla = this.form.controls.triangulo.value;
    this.tratamiento.alturaDeIliacos = this.form.controls.altura.value;
    this.tratamiento.barral = this.form.controls.barral.value;
    this.tratamiento.esferas = this.form.controls.esferas.value;
    this.tratamiento.especifico = this.form.controls.especifico.value;
    this.tratamiento.sedestacion = this.form.controls.sedestacion.value;
    this.tratamiento.proximoTurnoIndicado = this.form.controls.proximoTurno.value;
  }

}
