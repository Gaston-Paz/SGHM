import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NuevoPacienteService } from "./nuevo-paciente.service";
import { DomSanitizer } from "@angular/platform-browser";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { ConsultaInicialComponent } from "./consulta-inicial/consulta-inicial.component";
import { DatosPersonalesComponent } from "./datos-personales/datos-personales.component";
import { AntecedentesComponent } from "./antecedentes/antecedentes.component";
import { SnackService } from "src/app/shared/services/snack.service";
@Component({
  selector: "app-nuevo-paciente",
  templateUrl: "./nuevo-paciente.component.html",
  styleUrls: ["./nuevo-paciente.component.css"],
})
export class NuevoPacienteComponent implements OnInit, OnDestroy {
  @ViewChild(DatosPersonalesComponent)
  private datosPersonales!: DatosPersonalesComponent;

  @ViewChild(ConsultaInicialComponent)
  private consultaInicial!: ConsultaInicialComponent;

  @ViewChild(AntecedentesComponent)
  private antecedentes!: AntecedentesComponent;

  subscribes:any[]=[];

  constructor(
    private _servicePacienteNuevo: NuevoPacienteService,
    private sanitizer: DomSanitizer,
    private _snack: SnackService,
    private _spinnerService: SpinnerService
  ) {}

  ngOnDestroy(): void {
    this.subscribes.forEach(s => s.unsubscribe());
  }

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

    this.subscribes.push(this._servicePacienteNuevo.GuardarPaciente().subscribe(
      (paciente) => {

        this._servicePacienteNuevo.InicializarObjetos();
        this.datosPersonales.form.reset();
        this.consultaInicial.form.reset();
        this.antecedentes.form.reset();
        this._snack.Mensaje("El paciente se guardó con éxito",'success');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this._snack.Mensaje(error.error.message,'error');
      }
    ));
  }
}
