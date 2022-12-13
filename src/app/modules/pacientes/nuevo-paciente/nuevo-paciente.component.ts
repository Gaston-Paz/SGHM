import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { NuevoPacienteService } from "../nuevo-paciente.service";
import { mergeMap } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "src/app/shared/snack-bar/snack-bar.component";
@Component({
  selector: "app-nuevo-paciente",
  templateUrl: "./nuevo-paciente.component.html",
  styleUrls: ["./nuevo-paciente.component.css"],
})
export class NuevoPacienteComponent implements OnInit {

  constructor(
    private _servicePacienteNuevo: NuevoPacienteService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  FormValid() {
    return this._servicePacienteNuevo.FormValid();
    //return true;
  }

  GuardarPaciente() {
    let formData = new FormData();
    formData.append("foto", this._servicePacienteNuevo.imagen);
    this._servicePacienteNuevo.GuardarPaciente().subscribe(
      (paciente) => {
        if(this._servicePacienteNuevo.imagen !== undefined){

          this._servicePacienteNuevo
          .GuardarFoto(formData, paciente.idPaciente!)
          .subscribe(
            (resp) => {
              this._snackBar.openFromComponent(SnackBarComponent, {
                  data: {
                    mensaje: "El paciente se guardó con éxito"
                  },
                  horizontalPosition: "center",
                  panelClass: "success"
              });
            },
            (error: HttpErrorResponse) => {
              this._snackBar.openFromComponent(SnackBarComponent, {
                data: {
                  mensaje: "El paciente se guardó con éxito"
                },
                horizontalPosition: "center",
                panelClass: "error"
            });
            }
            );
          }else{
            this._snackBar.openFromComponent(SnackBarComponent, {
              data: {
                mensaje: "El paciente se guardó con éxito"
              },
              horizontalPosition: "center",
              panelClass: "success"
          });
          }
      },
      (error: HttpErrorResponse) => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: {
            mensaje: "El paciente se guardó con éxito"
          },
          horizontalPosition: "center",
          panelClass: "error"
      });
      }
    );
  }


}
