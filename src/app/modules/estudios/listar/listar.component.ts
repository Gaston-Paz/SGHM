import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { Estudios } from 'src/app/core/interfaces/estudio.interface';
import { SnackBarComponent } from 'src/app/shared/Components/snack-bar/snack-bar.component';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';
import { EstudiosService } from '../estudios.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  form!:FormGroup;
  pacientes:Paciente[]=[];
  estudios: Estudios[]=[];
  estudiosFiltrados: Estudios[]=[];

  constructor(private _formBuilder:FormBuilder,
    private _servicePaciente:NuevoPacienteService,
    private _snackBar: MatSnackBar,
    private _spinnerService: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private _serviceEstudio:EstudiosService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      paciente: [,[Validators.required]]
    });
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePaciente.ObtenerPacientes());
    obs.push(this._serviceEstudio.ObtenerEstudios());
    forkJoin(obs).subscribe(resp => {    
      this.pacientes = resp[0]; 
      resp[1].forEach((r: Estudios) => {
        let variables = r.ruta.toString().split("\\");
        r.ruta =
          "..//..//..//..//assets//" +
          variables[8] +
          "//" +
          variables[9] +
          "//" +
          variables[10];
          this.estudios.push(r);
      });          
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

  BuscarEstudios(){
    this.estudiosFiltrados = [];
    this.estudios.forEach(e => {
      if(e.paciente.idPaciente === this.form.controls.paciente.value) this.estudiosFiltrados.push(e);
    });
    this.estudiosFiltrados = this.estudiosFiltrados.sort((a,b)=>{
      if(a.idEstudio > b.idEstudio)return -1;
      else return 1;
    })
  }
}