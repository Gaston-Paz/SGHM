import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { forkJoin, Observable, timer } from "rxjs";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { Tratamiento } from "src/app/core/interfaces/tratamiento.interface";
import { ErrorService } from "src/app/shared/services/error.service";
import { SnackService } from "src/app/shared/services/snack.service";
import { NuevoPacienteService } from "../../pacientes/nuevo-paciente/nuevo-paciente.service";
import { UsuarioService } from "../../usuario/usuario.service";
import { ConsultasService } from "./consultas.service";

@Component({
  selector: "app-nueva-consulta",
  templateUrl: "./nueva-consulta.component.html",
  styleUrls: ["./nueva-consulta.component.css"],
})
export class NuevaConsultaComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  fecha: Date = new Date(Date.now());
  pacientes: Paciente[] = [];
  pacientesFilter: Paciente[] = [];
  pipe = new DatePipe("es-ES");
  tratamiento: Tratamiento = {
    fecha: new Date(),
    idPaciente: 0,
    motivo: "",
    sedestacion: "",
  };
  @Input("alta") alta: boolean = false;
  @Input("paciente") idPaciente: Paciente = {
    apellido: "",
    nombre: "",
    fechaNacimiento: new Date(),
    nacio: "",
  };
  consulta: Tratamiento = {
    fecha: new Date(),
    idPaciente: 0,
    motivo: "",
    sedestacion: "",
  };
  filtroPaciente: string = "";
  subscribes: any[] = [];
  mail: string = "";
  maximo: number = 255;

  constructor(
    private _formBuilder: FormBuilder,
    private _servicePaciente: NuevoPacienteService,
    private _spinnerService: NgxSpinnerService,
    private _serviceConsulta: ConsultasService,
    private _dateAdapter: DateAdapter<Date>,
    private _snack: SnackService,
    private _serviceError: ErrorService,
    private _router: Router,
    private _usuarioService: UsuarioService
  ) {
    this._dateAdapter.setLocale("es-ES");
  }

  ngOnInit(): void {
    // this.mapFechaForm();    
    if(this._serviceConsulta.editartto.paciente?.nombre !== ""){
      this.form = this._formBuilder.group({
        fecha: [
          this._serviceConsulta.editartto.fecha !== undefined &&
          this._serviceConsulta.editartto.fecha !== null
            ? this._serviceConsulta.editartto.fecha
            : null,
          [Validators.required],
        ],
        paciente: [, [Validators.required]],
        motivo: [
          this._serviceConsulta.editartto.motivo !== undefined &&
          this._serviceConsulta.editartto.motivo !== null
            ? this._serviceConsulta.editartto.motivo
            : "",
          [Validators.required],
        ],
        triangulo: [
          this._serviceConsulta.editartto.trianguloDeTalla !== undefined &&
          this._serviceConsulta.editartto.trianguloDeTalla !== null
            ? this._serviceConsulta.editartto.trianguloDeTalla
            : "",
        ],
        altura: [
          this._serviceConsulta.editartto.alturaDeIliacos !== undefined &&
          this._serviceConsulta.editartto.alturaDeIliacos !== null
            ? this._serviceConsulta.editartto.alturaDeIliacos
            : "",
        ],
        barral: [
          this._serviceConsulta.editartto.barral !== undefined &&
          this._serviceConsulta.editartto.barral !== null
            ? this._serviceConsulta.editartto.barral
            : "",
        ],
        esferas: [
          this._serviceConsulta.editartto.esferas !== undefined &&
          this._serviceConsulta.editartto.esferas !== null
            ? this._serviceConsulta.editartto.esferas
            : "",
        ],
        especifico: [
          this._serviceConsulta.editartto.especifico !== undefined &&
          this._serviceConsulta.editartto.especifico !== null
            ? this._serviceConsulta.editartto.especifico
            : "",
        ],
        sugerencias: [
          this._serviceConsulta.editartto.sugerencias !== undefined &&
          this._serviceConsulta.editartto.sugerencias !== null
            ? this._serviceConsulta.editartto.sugerencias
            : "",
        ],
        sedestacion: [
          this._serviceConsulta.editartto.sedestacion !== undefined &&
          this._serviceConsulta.editartto.sedestacion !== null
            ? this._serviceConsulta.editartto.sedestacion
            : "",
          [Validators.required],
        ],
        proximoTurno: [
          this._serviceConsulta.editartto.proximoTurnoIndicado !== undefined &&
          this._serviceConsulta.editartto.proximoTurnoIndicado !== null
            ? this._serviceConsulta.editartto.proximoTurnoIndicado
            : "",
        ],
      });
    }else{
      this.form = this._formBuilder.group({
        fecha: [,[Validators.required],],
        paciente: [, [Validators.required]],
        motivo: [,[Validators.required]],
        triangulo: [],
        altura: [],
        barral: [],
        esferas: [],
        especifico: [],
        sugerencias: [],
        sedestacion: [,[Validators.required]],
        proximoTurno: [],
      });
    }


    let obs: Array<Observable<any>> = [];
    this.mail = localStorage.getItem("SGHC-mail")!;
    obs.push(this._servicePaciente.ObtenerPacientes());
    if (this.mail !== null)
      obs.push(this._usuarioService.GetUsuario(this.mail));

    this.subscribes.push(
      forkJoin(obs).subscribe(
        (resp) => {
          this.pacientes = resp[0];
          this.pacientesFilter = resp[0];
          if (this._serviceConsulta.editartto.idPaciente !== 0) {
            this.form.controls.paciente.setValue(
              this._serviceConsulta.editartto.paciente!.idPaciente
            );
            this.tratamiento.idTratamiento =
              this._serviceConsulta.editartto.idTratamiento;
          } else {
            this.form.controls.paciente.setValue(this.idPaciente.idPaciente);
          }

          if (this.mail !== null) {
            this._serviceError.Usuario = resp[1];
            if (this._serviceError.Usuario.rol === "Admin")
              this._serviceError.Nav = this._serviceError.fillerNav;
            else
              this._serviceError.Nav = this._serviceError.fillerNav.filter(
                (f: any) => !f.text.toUpperCase().includes("USUARIO")
              );
            this._serviceError.muestroMenu = true;
          }
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error);
        }
      )
    );
  }

  mapFechaForm() {
    if (
      this._serviceConsulta.editartto.fecha !== undefined &&
      this._serviceConsulta.editartto.fecha !== null
    ) {
      this._serviceConsulta.editartto.fecha = this.parseFecha(
        this._serviceConsulta.editartto.fecha.toString()
      );
    }
    if (
      this._serviceConsulta.editartto.proximoTurnoIndicado !== null &&
      this._serviceConsulta.editartto.proximoTurnoIndicado !== undefined
    )
      this._serviceConsulta.editartto.proximoTurnoIndicado = this.parseFecha(
        this._serviceConsulta.editartto.proximoTurnoIndicado!.toString()
      );
  }

  parseFecha(fecha: string) {
    let partFecha = fecha.split("-");
    return new Date(
      parseInt(partFecha[0]),
      parseInt(partFecha[1]) - 1,
      parseInt(partFecha[2])
    );
  }

  ngOnDestroy(): void {
    this.subscribes.forEach((s) => s.unsubscribe());
  }

  changeDate(date: any, control: number, esAlta: boolean = false) {
    let dateParts = date.value.split("/");
    let fechaInput = new Date(
      +dateParts[2],
      dateParts[1] - 1,
      +dateParts[0]
    ).getTime();
    let fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    if (control === 1) this.form.controls.fecha.setValue(fecha);
    else if (control === 2) this.form.controls.proximoTurno.setValue(fecha);

    this.consulta.proximoTurnoIndicado = new Date(fecha);

    if (esAlta) this.SetConsultaAlta();
  }

  GuardarConsulta() {
    this.MapTratamiento();
    this.subscribes.push(
      this._serviceConsulta.GuardarConsultas(this.tratamiento).subscribe(
        (resp) => {
          this._snack.Mensaje("El tratamiento se guardó con éxito", "success");
          this.form.reset();
          const espera = timer(1500);
          espera.subscribe(() => {
            this._serviceConsulta.paciente = this.tratamiento.paciente!;
            this._router.navigate(["home/consultas/listar-consultas"]);
          });
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error);
        }
      )
    );
  }

  MapTratamiento() {
    this.tratamiento.fecha = this.form.controls.fecha.value;
    this.tratamiento.idPaciente = this.form.controls.paciente.value;
    this.tratamiento.paciente = this.pacientes.find(
      (x) => x.idPaciente === this.tratamiento.idPaciente
    );
    this.tratamiento.motivo = this.form.controls.motivo.value;
    this.tratamiento.trianguloDeTalla = this.form.controls.triangulo.value;
    this.tratamiento.alturaDeIliacos = this.form.controls.altura.value;
    this.tratamiento.barral = this.form.controls.barral.value;
    this.tratamiento.esferas = this.form.controls.esferas.value;
    this.tratamiento.especifico = this.form.controls.especifico.value;
    this.tratamiento.sedestacion = this.form.controls.sedestacion.value;
    this.tratamiento.proximoTurnoIndicado =
      this.form.controls.proximoTurno.value;
    this.tratamiento.sugerencias = this.form.controls.sugerencias.value;
  }

  SetConsultaAlta() {
    this._servicePaciente.consulta = this.consulta;
    if (this.consulta.sedestacion !== "" && this.consulta.sedestacion !== null && this.consulta.sedestacion !== undefined) this._servicePaciente.tratamientoCompleto = true;
    else this._servicePaciente.tratamientoCompleto = false;
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
}
