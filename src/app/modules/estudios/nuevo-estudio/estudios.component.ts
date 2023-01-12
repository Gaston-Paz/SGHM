import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { SnackBarComponent } from 'src/app/shared/Components/snack-bar/snack-bar.component';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  pacientes:Paciente[]=[];
  form!:FormGroup;
  previsualizacionFoto: string[] = [];
  filtroPaciente:string = '';
  pacientesFilter: Paciente[] = [];

  //Chips
  addOnBlur:boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  nombresNuevos:string[] = [];
  cantiArchivos:number = 0;

  constructor(private _formBuilder:FormBuilder,
    private _servicePaciente:NuevoPacienteService,
    private _snackBar: MatSnackBar,
    private _spinnerService: NgxSpinnerService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      paciente: [,[Validators.required]]
    });
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePaciente.ObtenerPacientes());
    forkJoin(obs).subscribe(resp => {    
      this.pacientes = resp[0];      
      this.pacientesFilter = resp[0];      
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

  GuardarEstudios(){
    if(this._servicePaciente.estudios.length !== this.nombresNuevos.length){
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: {
          mensaje: "La cantidad de archivos debe coincidir con la cantidad de nombres ingresados",
        },
        horizontalPosition: "center",
        panelClass: "error",
      });
    }else{
    let obs: Array<Observable<any>> = [];
    if (this._servicePaciente.estudios.length > 0) {
      this._servicePaciente.estudios.forEach((est,index) => {
        let formDatas = new FormData();
        formDatas.append("foto", est);
        obs.push(
          this._servicePaciente.GuardarFoto(
            formDatas,
            this.form.controls.paciente.value,
            true,
            this.nombresNuevos[index]
          )
        );

      });
      forkJoin(obs).subscribe(resp => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: {
            mensaje: "El estudio se guardó con éxito",
          },
          horizontalPosition: "center",
          panelClass: "success",
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
      })
    }
  }
  }

  GetEstudio(){
    return this._servicePaciente.estudios.length > 0;
  }

  applyFilterPaciente(espacio:boolean){
    let filter = this.filtroPaciente + "";
    if(espacio) filter += "";
    this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes));
    if(filter != 'undefined') this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes.filter(x => x.apellido.toUpperCase().includes(filter.toUpperCase()) || x.nombre.toUpperCase().includes(filter.toUpperCase()))));
  }

  //Chips
  remove(nombre:string){
    const index = this.nombresNuevos.indexOf(nombre);
    if(index >= 0)this.nombresNuevos.splice(index,1);
  }

  add(ev:MatChipInputEvent){
    const value = (ev.value || '').trim();
    if(value)this.nombresNuevos.push(ev.value);
    ev.chipInput!.clear();
    
  }
}
