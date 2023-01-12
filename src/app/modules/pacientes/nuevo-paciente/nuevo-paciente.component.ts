import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { NuevoPacienteService } from "./nuevo-paciente.service";
import { mergeMap } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "src/app/shared/Components/snack-bar/snack-bar.component";
import { forkJoin, Observable } from "rxjs";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { ConsultaInicialComponent } from "./consulta-inicial/consulta-inicial.component";
import { DatosPersonalesComponent } from "./datos-personales/datos-personales.component";
import { AntecedentesComponent } from "./antecedentes/antecedentes.component";
import { EstudiosMedicosComponent } from "./estudios-medicos/estudios-medicos.component";
@Component({
  selector: "app-nuevo-paciente",
  templateUrl: "./nuevo-paciente.component.html",
  styleUrls: ["./nuevo-paciente.component.css"],
})
export class NuevoPacienteComponent implements OnInit {

  @ViewChild(DatosPersonalesComponent)
  private datosPersonales!: DatosPersonalesComponent;

  @ViewChild(ConsultaInicialComponent)
  private consultaInicial!: ConsultaInicialComponent;

  @ViewChild(AntecedentesComponent)
  private antecedentes!: AntecedentesComponent;

  constructor(
    private _servicePacienteNuevo: NuevoPacienteService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private _spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {}

  FormValid() {
    return this._servicePacienteNuevo.FormValid();
  }

  GetAntecedente(){
    return this._servicePacienteNuevo.antecedente;
  }

  GuardarPaciente() {
    let obs: Array<Observable<any>> = [];
    let formData = new FormData();
    formData.append("foto", this._servicePacienteNuevo.imagen);
    this._servicePacienteNuevo.GuardarPaciente().subscribe(
      (paciente) => {
        // if (this._servicePacienteNuevo.imagen !== undefined) {
        //   obs.push(
        //     this._servicePacienteNuevo.GuardarFoto(
        //       formData,
        //       paciente.idPaciente!,
        //       false
        //     )
        //   );
        // }

        // if (this._servicePacienteNuevo.estudios.length > 0) {
        //   this._servicePacienteNuevo.estudios.forEach((est) => {
        //     let formDatas = new FormData();
        //     formDatas.append("foto", est);
        //     obs.push(
        //       this._servicePacienteNuevo.GuardarFoto(
        //         formDatas,
        //         paciente.idPaciente!,
        //         true
        //       )
        //     );

        //   });
        // }
          forkJoin(obs).subscribe(
            (resp) => {
              this._snackBar.openFromComponent(SnackBarComponent, {
                data: {
                  mensaje: "El paciente se guardó con éxito",
                },
                horizontalPosition: "center",
                panelClass: "success",
              });
            },
            (error: HttpErrorResponse) => {
              console.log(error);
              this._snackBar.openFromComponent(SnackBarComponent, {
                data: {
                  mensaje: error.error.message,
                },
                horizontalPosition: "center",
                panelClass: "error",
              });
            }
          );

        this._servicePacienteNuevo.InicializarObjetos();
        this.datosPersonales.form.reset();
        this.consultaInicial.form.reset();
        this.antecedentes.form.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: {
            mensaje: error.error.message,
          },
          horizontalPosition: "center",
          panelClass: "error",
        });
      }
    );

  }
}
