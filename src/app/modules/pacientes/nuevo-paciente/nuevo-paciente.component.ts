import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NuevoPacienteService } from "./nuevo-paciente.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "src/app/shared/Components/snack-bar/snack-bar.component";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { ConsultaInicialComponent } from "./consulta-inicial/consulta-inicial.component";
import { DatosPersonalesComponent } from "./datos-personales/datos-personales.component";
import { AntecedentesComponent } from "./antecedentes/antecedentes.component";
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

  GetAntecedente() {
    return this._servicePacienteNuevo.antecedente;
  }

  GuardarPaciente() {
    let formData = new FormData();
    formData.append("foto", this._servicePacienteNuevo.imagen);

    this._servicePacienteNuevo.GuardarPaciente().subscribe(
      (paciente) => {

        this._servicePacienteNuevo.InicializarObjetos();
        this.datosPersonales.form.reset();
        this.consultaInicial.form.reset();
        this.antecedentes.form.reset();
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
  }
}
