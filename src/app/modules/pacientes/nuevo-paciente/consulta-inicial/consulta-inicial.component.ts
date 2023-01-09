import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ConsultaInicial } from 'src/app/core/interfaces/consulta-inicial.interface';
import { NuevoPacienteService } from '../nuevo-paciente.service';

@Component({
  selector: 'app-consulta-inicial',
  templateUrl: './consulta-inicial.component.html',
  styleUrls: ['./consulta-inicial.component.css']
})
export class ConsultaInicialComponent implements OnInit {

  form!: FormGroup;
  fecha: Date = new Date();
  @Input("consulta") consulta!: ConsultaInicial;
  @Input("hayConsulta") hayConsulta: boolean = false;
  pipe = new DatePipe('es-ES');

  constructor(private _formBuilder: FormBuilder,
    private _servicePacienteNuevo: NuevoPacienteService,
    private _dateAdapter: DateAdapter<Date>) {
      this._dateAdapter.setLocale('es-ES');
     }

  ngOnInit(): void {   

    if(this.hayConsulta){
      this.form = this._formBuilder.group({
        fecha: [new Date(this.consulta.fecha), Validators.required],
        motivo: [this.consulta.motivo, Validators.required],
        localizacion: [this.consulta.localizacion, Validators.required],
        antiguedad: [this.consulta.antiguedad, Validators.required],
        intensidad: [this.consulta.intensidad],
        caracteristica: [this.consulta.caracteristica],
        irradiacion: [this.consulta.irradiacion],
        atenua: [this.consulta.atenua],
        actividadFisica: [this.consulta.actividadFisica],
        covid: [this.consulta.covid],
      });
    }else{
      this.form = this._formBuilder.group({
        fecha: ["", Validators.required],
        motivo: ["", Validators.required],
        localizacion: [, Validators.required],
        antiguedad: [, Validators.required],
        intensidad: [, Validators.required],
        caracteristica: ["", [Validators.required]],
        irradiacion: ["", Validators.required],
        atenua: ["", Validators.required],
        actividadFisica: ["", Validators.required],
        covid: [""],
      });
    }
  }

  CargarConsultaInicial(ev:any,campo:number){
    let valor = "";
    if(campo !== 10) valor = (ev.target.value);    
    this._servicePacienteNuevo.CargarConsultaInicial(valor,campo,this.form.valid);
  }

  changeDate(date:any){
    // let fechaaux = new Date(date.value);
    // let fechas = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()));
    // let fecha = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()+1));
    // this.form.controls.fecha.setValue(fechas);   
    // this._servicePacienteNuevo.CargarConsultaInicial(fecha.toDateString(),3, this.form.valid);   
    
    let dateParts = date.value.split('/');
    let fechaInput = new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]).getTime();
    let fecha = new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]);
    let fechaMostrar = new Date(fechaInput).toLocaleDateString();
    this.form.controls.fecha.setValue(fecha);   
    this._servicePacienteNuevo.CargarConsultaInicial(fechaMostrar,3, this.form.valid);
  }

}
