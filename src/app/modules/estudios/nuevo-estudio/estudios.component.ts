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


@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  pacientes:Paciente[]=[];
  form!:FormGroup;
  previsualizacionFoto: string[] = [];

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
    let obs: Array<Observable<any>> = [];
    if (this._servicePaciente.estudios.length > 0) {
      this._servicePaciente.estudios.forEach((est) => {
        let formDatas = new FormData();
        formDatas.append("foto", est);
        obs.push(
          this._servicePaciente.GuardarFoto(
            formDatas,
            this.form.controls.paciente.value,
            true
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

  CargarEstudios(ev: any) {
    let cantFotos = ev.target.files.length;
    for (let index = 0; index < cantFotos; index++) {
      const fotoCapturada = ev.target.files[index];      
      this.ExtraerBase64(fotoCapturada).then((imagen: any) => {
        this.previsualizacionFoto.push(imagen.base);
        this.SubirEstudio(fotoCapturada);
      });
      
    }
    
      
  }

  ExtraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
        return null;
      } catch (e) {
        return null;
      }
  });

  SubirEstudio(archivo:any){
    this._servicePaciente.estudios.push(archivo);
  }

  GetEstudio(){
    return this._servicePaciente.estudios.length > 0;
  }
}
