import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoPacienteService } from '../../nuevo-paciente.service';

@Component({
  selector: 'app-consulta-inicial',
  templateUrl: './consulta-inicial.component.html',
  styleUrls: ['./consulta-inicial.component.css']
})
export class ConsultaInicialComponent implements OnInit {

  form!: FormGroup;
  fecha: Date = new Date();

  constructor(private _formBuilder: FormBuilder,
    private _servicePacienteNuevo: NuevoPacienteService) { }

  ngOnInit(): void {
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

  CargarConsultaInicial(ev:any,campo:number){
    let valor = "";
    if(campo !== 10) valor = (ev.target.value);    
    this._servicePacienteNuevo.CargarConsultaInicial(valor,campo,this.form.valid);
  }

  changeDate(date:any){
    let fechaaux = new Date(date.value);
    let fechas = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()));
    let fecha = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()+1));
    this.form.controls.fecha.setValue(fechas);   
    this._servicePacienteNuevo.CargarConsultaInicial(fecha.toDateString(),3, this.form.valid);    
  }

}
