import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { SnackBarComponent } from 'src/app/shared/Components/snack-bar/snack-bar.component';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';

@Component({
  selector: 'app-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrls: ['./nueva-consulta.component.css']
})
export class NuevaConsultaComponent implements OnInit {
  form!: FormGroup;
  fecha: Date = new Date();
  pacientes: Paciente[] = [];

  constructor(private _formBuilder: FormBuilder,
    private _servicePaciente:NuevoPacienteService,
    private _snackBar: MatSnackBar,
    private _spinnerService: NgxSpinnerService) { }

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

  changeDate(date:any){
    let fechaaux = new Date(date.value);
    let fechas = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()));
    let fecha = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()+1));
    this.form.controls.fechaNacimiento.setValue(fechas);   

  }

  GuardarConsulta(){

  }

}
