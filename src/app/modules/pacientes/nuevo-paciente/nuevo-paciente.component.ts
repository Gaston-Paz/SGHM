import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { NuevoPacienteService } from "../nuevo-paciente.service";
import { mergeMap } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-nuevo-paciente",
  templateUrl: "./nuevo-paciente.component.html",
  styleUrls: ["./nuevo-paciente.component.css"],
})
export class NuevoPacienteComponent implements OnInit {
  foti: string = "";
  fotis: string = "";


  constructor(
    private _servicePacienteNuevo: NuevoPacienteService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._servicePacienteNuevo.ObtenerPacientes().subscribe(
      (resp) => {
        let lista = resp;
        this.fotis = lista[1].fotoPerfil;

      },
      (error: HttpErrorResponse) => {}
    );
  }

  FormValid() {
    // return this._servicePacienteNuevo.FormValid();
    return true;
  }

  GuardarPaciente() {
    let formData = new FormData();
    formData.append("foto", this._servicePacienteNuevo.imagen);
    this._servicePacienteNuevo.GuardarPaciente().subscribe(
      (paciente) => {
        this._servicePacienteNuevo
          .GuardarFoto(formData, paciente.idPaciente!)
          .subscribe(
            (resp) => {
              console.log("Se guardó");
              console.log(resp);
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


}
