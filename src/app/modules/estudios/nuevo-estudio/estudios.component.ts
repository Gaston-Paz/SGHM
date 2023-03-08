import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { forkJoin, Observable, timer } from "rxjs";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { NuevoPacienteService } from "../../pacientes/nuevo-paciente/nuevo-paciente.service";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { SnackService } from "src/app/shared/services/snack.service";
import { EstudiosService } from "../estudios.service";
import { EstudiosMedicosComponent } from "../estudios-medicos/estudios-medicos.component";
import { ErrorService } from "src/app/shared/services/error.service";
import { UsuarioService } from "../../usuario/usuario.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-estudios",
  templateUrl: "./estudios.component.html",
  styleUrls: ["./estudios.component.css"],
})
export class EstudiosComponent implements OnInit, OnDestroy {
  pacientes: Paciente[] = [];
  form!: FormGroup;
  previsualizacionFoto: string[] = [];
  filtroPaciente: string = "";
  pacientesFilter: Paciente[] = [];
  subscribes: any[] = [];
  //Chips
  addOnBlur: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  nombresNuevos: string[] = [];
  cantiArchivos: number = 0;

  @ViewChild(EstudiosMedicosComponent) estudioComponent!: EstudiosMedicosComponent;

  mail:string='';

  constructor(
    private _formBuilder: FormBuilder,
    private _servicePaciente: NuevoPacienteService,
    private _spinnerService: NgxSpinnerService,
    private _snack: SnackService,
    private _serviceEstudio:EstudiosService,
    private _serviceError:ErrorService,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscribes.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this._servicePaciente.estudios = [];
    this.form = this._formBuilder.group({
      paciente: [, [Validators.required]],
    });
    let obs: Array<Observable<any>> = [];
    this.mail = localStorage.getItem("SGHC-mail")!;
    obs.push(this._servicePaciente.ObtenerPacientes());
    if (this.mail !== null)obs.push(this._usuarioService.GetUsuario(this.mail));
    this.subscribes.push(
      forkJoin(obs).subscribe(
        (resp) => {
          this.pacientes = resp[0];
          this.pacientesFilter = resp[0];
          if (this.mail !== null){
            this._serviceError.Usuario = resp[1];
          if(this._serviceError.Usuario.rol === "Admin")this._serviceError.Nav = this._serviceError.fillerNav;
          else this._serviceError.Nav = this._serviceError.fillerNav.filter((f:any) => !f.text.toUpperCase().includes('USUARIO'));
          this._serviceError.muestroMenu = true;
          }

          if(this._serviceEstudio.paciente.idPaciente !== 0){
            this.form.controls.paciente.setValue(this._serviceEstudio.paciente.idPaciente);
          }
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error);
        }
      )
    );
  }

  GuardarEstudios() {
    console.log(this._servicePaciente.estudios);
    console.log(this.nombresNuevos);
    
    if (this._servicePaciente.estudios.length !== this.nombresNuevos.length) {
      this._snack.Mensaje(
        "La cantidad de archivos debe coincidir con la cantidad de nombres ingresados",
        "error"
      );
    } else {
      let obs: Array<Observable<any>> = [];
      if (this._servicePaciente.estudios.length > 0) {
        this._servicePaciente.estudios.forEach((estudio, index) => {
          let formData = new FormData();
          formData.append("estudio", estudio);
          obs.push(
            this._serviceEstudio.GuardarEstudio(
              formData,
              this.form.controls.paciente.value,
              this.nombresNuevos[index]
            )
          );
        });
        this.subscribes.push(
          forkJoin(obs).subscribe(
            (resp) => {
              this._snack.Mensaje("El estudio se guardó con éxito", "success");
              this.nombresNuevos = [];
              const espera = timer(1500);
              espera.subscribe(() => {
                this.estudioComponent.VaciarFotos();                
                this._serviceEstudio.paciente = this.pacientes.find(x => x.idPaciente === this.form.controls.paciente.value)!;
                this.form.reset();
                this._router.navigate(['home/estudios/listar-estudios']);
              });
            },
            (error: HttpErrorResponse) => {
              this._serviceError.Error(error);
            }
          )
        );
      }
    }
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

  GetEstudio(){
    return this._servicePaciente.estudios.length > 0;
  }

  //Chips
  remove(nombre: string) {
    const index = this.nombresNuevos.indexOf(nombre);
    if (index >= 0) this.nombresNuevos.splice(index, 1);
  }

  add(ev: MatChipInputEvent) {
    const value = (ev.value || "").trim();
    if (value) this.nombresNuevos.push(ev.value);
    ev.chipInput!.clear();
  }
}
