import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { forkJoin, Observable } from "rxjs";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { ModalConfirmComponent } from "src/app/shared/Components/modal-confirm/modal-confirm.component";
import { SnackBarComponent } from "src/app/shared/Components/snack-bar/snack-bar.component";
import { NuevoPacienteService } from "../../pacientes/nuevo-paciente/nuevo-paciente.service";

@Component({
  selector: "app-foto",
  templateUrl: "./foto.component.html",
  styleUrls: ["./foto.component.css"],
})
export class FotoComponent implements OnInit {
  pacientes: Paciente[] = [];
  form!: FormGroup;
  previsualizacionFoto: string = "";
  filtroPaciente: string = "";
  pacientesFilter: Paciente[] = [];
  yaTieneFoto:boolean = false;
  paciente: Paciente = {
    apellido: "",
    celular: "",
    fechaNacimiento: new Date(),
    email: "",
    nacio: "",
    nombre: "",
    ocupacion: "",
    localidad: "",
    otros:"",
    deParte: ""
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _servicePaciente: NuevoPacienteService,
    private _snackBar: MatSnackBar,
    private _spinnerService: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      paciente: [, [Validators.required]],
      foto: [, [Validators.required]],
    });
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePaciente.ObtenerPacientes());
    forkJoin(obs).subscribe(
      (resp) => {
        this.pacientes = resp[0];
        this.pacientesFilter = resp[0];
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
    this.ExtraerBase64(fotoCapturada).then((imagen: any) => {
      this.previsualizacionFoto = imagen.base;
      this.SubirImagen(ev.target.files[0]);
    });
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

  SubirImagen(archivo: any) {
    this._servicePaciente.imagen = archivo;
  }

  GetFoto() {
    return this._servicePaciente.imagen.size > 0;
  }

  GuardarFoto() {
    if(this.yaTieneFoto){
      const dialogRef = this.dialog.open(ModalConfirmComponent, {
        data: {
          message: 'El paciente ya cuenta con una foto de perfil cargada, ¿Desea sobreescribirla?',
          buttonText: {
            ok: 'Sobreescribir',
            cancel: 'Cancelar'
          },
          action: 'Confirmar'
        }
      });

      dialogRef.afterClosed().subscribe((confirm:boolean) => {
          if(confirm){
            this.form.reset();
            let formData = new FormData();
            formData.append("foto", this._servicePaciente.imagen);
            let obs: Array<Observable<any>> = [];
            obs.push(this._servicePaciente.GuardarFoto(formData,this.paciente.idPaciente!,false));
            obs.push(this._servicePaciente.ActualizarDatosPersonales(this.paciente));
            forkJoin(obs).subscribe(resp => {
              this._snackBar.openFromComponent(SnackBarComponent, {
                data: {
                  mensaje: 'La foto de perfil se guardó con éxito',
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
          
      });
    }else{
      this.form.reset();
            let formData = new FormData();
            formData.append("foto", this._servicePaciente.imagen);
            let obs: Array<Observable<any>> = [];
            obs.push(this._servicePaciente.GuardarFoto(formData,this.paciente.idPaciente!,false));
            obs.push(this._servicePaciente.ActualizarDatosPersonales(this.paciente));
            forkJoin(obs).subscribe(resp => {
              this._snackBar.openFromComponent(SnackBarComponent, {
                data: {
                  mensaje: 'La foto de perfil se guardó con éxito',
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

  CheckFoto(ev:MatSelectChange){
    this.paciente = this.pacientes.find(x => x.idPaciente === ev.value)!;
    if(this.paciente?.fotoPerfil !== undefined && this.paciente.fotoPerfil !== null)this.yaTieneFoto = true;
    
  }
}
