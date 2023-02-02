import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { forkJoin, Observable, timer } from "rxjs";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { ModalConfirmComponent } from "src/app/shared/Components/modal-confirm/modal-confirm.component";
import { ErrorService } from "src/app/shared/services/error.service";
import { SnackService } from "src/app/shared/services/snack.service";
import { NuevoPacienteService } from "../../pacientes/nuevo-paciente/nuevo-paciente.service";

@Component({
  selector: "app-foto",
  templateUrl: "./foto.component.html",
  styleUrls: ["./foto.component.css"],
})
export class FotoComponent implements OnInit, OnDestroy {
  pacientes: Paciente[] = [];
  form!: FormGroup;
  previsualizacionFoto: any;
  filtroPaciente: string = "";
  pacientesFilter: Paciente[] = [];
  yaTieneFoto: boolean = false;
  paciente: Paciente = {
    apellido: "",
    celular: "",
    fechaNacimiento: new Date(),
    email: "",
    nacio: "",
    nombre: "",
    ocupacion: "",
    localidad: "",
    otros: "",
    deParte: "",
  };
  subscribes: any[] = [];
  formData!: FormData;

  constructor(
    private _formBuilder: FormBuilder,
    private _servicePaciente: NuevoPacienteService,
    private _spinnerService: NgxSpinnerService,
    private _sanitizer: DomSanitizer,
    private _dialog: MatDialog,
    private _snack: SnackService,
    private _serviceError: ErrorService,
    private _router:Router
  ) {}

  ngOnDestroy(): void {
    this.subscribes.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      paciente: [, [Validators.required]],
      foto: [, [Validators.required]],
    });
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePaciente.ObtenerPacientes());
    this.subscribes.push(
      forkJoin(obs).subscribe(
        (resp) => {
          this.pacientes = resp[0];
          this.pacientesFilter = resp[0];
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error);
        }
      )
    );
  }

  applyFilterPaciente(espacio: boolean) {
    let filter = this.filtroPaciente + "";
    if (espacio) filter += "";
    this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes));
    if (filter != "undefined")
      this.pacientesFilter = JSON.parse(
        JSON.stringify(
          this.pacientes.filter(
            (x) =>
              x.apellido.toUpperCase().includes(filter.toUpperCase()) ||
              x.nombre.toUpperCase().includes(filter.toUpperCase())
          )
        )
      );
  }

  CargarFoto(ev: any) {
    const fotoCapturada = ev.target.files[0];
    this.formData = new FormData();
    this.formData.append("fotoPerfil", fotoCapturada);

    this.ExtraerBase64(fotoCapturada).then((imagen: any) => {
      this.previsualizacionFoto = imagen.base;
    });
  }

  ExtraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this._sanitizer.bypassSecurityTrustUrl(unsafeImg);
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

  CheckFoto(ev: MatSelectChange) {
    this.paciente = this.pacientes.find((x) => x.idPaciente === ev.value)!;
    if (
      this.paciente?.fotoPerfil !== undefined &&
      this.paciente.fotoPerfil !== null
    ) {
      this.yaTieneFoto = true;
    }
  }

  GuardarFoto() {
    if (this.yaTieneFoto) {
      const dialogRef = this._dialog.open(ModalConfirmComponent, {
        data: {
          message:
            "El paciente ya cuenta con una foto de perfil cargada, ¿Desea sobreescribirla?",
          buttonText: {
            ok: "Sobreescribir",
            cancel: "Cancelar",
          },
          action: "Confirmar",
        },
      });

      dialogRef.afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this._servicePaciente
            .GuardarleFoto(this.formData, this.form.controls.paciente.value)
            .subscribe(
              (resp) => {
                this._snack.Mensaje(
                  "La foto de perfil se guardó con éxito",
                  "success"
                );
                const espera = timer(1500);
                espera.subscribe(() => {
                  this._router.navigate(["home/pacientes/listar-pacientes"]);
                });
              },
              (error: HttpErrorResponse) => {
                this._serviceError.Error(error);
              }
            );
        }
      });
      this.form.reset();
    } else {
      this._servicePaciente
        .GuardarleFoto(this.formData, this.form.controls.paciente.value)
        .subscribe(
          (resp) => {
            this._snack.Mensaje(
              "La foto de perfil se guardó con éxito",
              "success"
            );
            const espera = timer(1500);
            espera.subscribe(() => {
              this._router.navigate(["home/pacientes/listar-pacientes"]);
            });
          },
          (error: HttpErrorResponse) => {
            this._serviceError.Error(error);
          }
        );
      this.form.reset();
    }
  }
}
