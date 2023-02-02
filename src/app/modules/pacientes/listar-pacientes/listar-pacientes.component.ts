import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Antecedente } from "src/app/core/interfaces/antecedentes.interface";
import { ConsultaInicial } from "src/app/core/interfaces/consulta-inicial.interface";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { ErrorService } from "src/app/shared/services/error.service";
import { SnackService } from "src/app/shared/services/snack.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { ConsultasService } from "../../consultas/nueva-consulta/consultas.service";
import { NuevoPacienteService } from "../nuevo-paciente/nuevo-paciente.service";
import { ListadosService } from "./listados.service";

@Component({
  selector: "app-listar-pacientes",
  templateUrl: "./listar-pacientes.component.html",
  styleUrls: ["./listar-pacientes.component.css"],
})
export class ListarPacientesComponent implements OnInit, AfterViewInit {
  pacientes: Paciente[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "apellido",
    "nombre",
    "mail",
    "nacimiento",
    "foto",
    "antecedentes",
    "consultaInicial",
    "consultas",
    "nuevaConsulta",
  ];
  dataSource = new MatTableDataSource();
  pacientesVer: boolean = true;
  antecedentes: boolean = false;
  consultaInicial: boolean = false;
  consultaNueva: boolean = false;
  turnos: boolean = false;
  nombrePaciente: string = "";
  apellidoPaciente: string = "";
  antecedente: Antecedente = {
    diabetes: false,
    embarazos: false,
    menstruacion: false,
    ortodoncia: false,
    placaDescanso: false,
    contencion: false,
  };
  consultas: ConsultaInicial = {
    antiguedad: "",
    localizacion: "",
    motivo: "",
    covid: false,
    fecha: new Date(),
  };
  idPaciente: Paciente = {
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
  edicion: boolean = false;
  url:any;

  constructor(
    private _servicePacienteNuevo: NuevoPacienteService,
    private _spinnerService: SpinnerService,
    private _serviceListados: ListadosService,
    private _serviceConsulta: ConsultasService,
    private _snack: SnackService,
    private _serviceError:ErrorService
  ) {}

  ngOnInit(): void {
    this._servicePacienteNuevo.ObtenerPacientes().subscribe(
      (resp) => {
        resp.forEach((r) => {
          r.fechaNacimiento = new Date(r.fechaNacimiento);
          var fechaInicio = new Date(r.fechaNacimiento).getTime();
          var fechaFin = new Date().getTime();
          var diff = fechaFin - fechaInicio;
          r.edad = diff / (1000 * 60 * 60 * 24 * 365);
          this.pacientes.push(r);
        });

        this.dataSource.data = this.pacientes.sort((a, b) => {
          if (a.apellido < b.apellido) return -1;
          else return 1;
        });
      },
      (error: HttpErrorResponse) => {
        this._serviceError.Error(error)
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  VerAntecedentes(element: Paciente) {
    this._serviceListados
      .ObtenerAntecedentePorId(element.idPaciente!)
      .subscribe(
        (resp) => {
          this.antecedente = resp;
          this.antecedentes = true;
          this.pacientesVer = false;
          this.consultaInicial = false;
          this.consultaNueva = false;
          this.turnos = false;

          this.nombrePaciente = element.nombre;
          this.apellidoPaciente = element.apellido;
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error)
        }
      );
  }

  VerConsultas(element: Paciente) {
    this._serviceListados.ObtenerConsultaPorId(element.idPaciente!).subscribe(
      (resp) => {
        this.consultas = resp;
        this.antecedentes = false;
        this.pacientesVer = false;
        this.consultaInicial = true;
        this.consultaNueva = false;
        this.turnos = false;

        this.nombrePaciente = element.nombre;
        this.apellidoPaciente = element.apellido;
      },
      (error: HttpErrorResponse) => {
        this._serviceError.Error(error)
      }
    );
  }

  Volver() {
    this.edicion = false;
    this.antecedentes = false;
    this.pacientesVer = true;
    this.consultaInicial = false;
    this.turnos = false;
    this.consultaNueva = false;
    this._serviceConsulta.paciente = {
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
  }

  verTurnos(paciente: Paciente) {
    this._serviceConsulta.paciente = paciente;
    this.antecedentes = false;
    this.pacientesVer = false;
    this.consultaInicial = false;
    this.turnos = true;
    this.consultaNueva = false;
  }

  NuevaConsulta(paciente: Paciente) {
    this.idPaciente = paciente!;
    this.consultaNueva = true;
    this.antecedentes = false;
    this.pacientesVer = false;
    this.consultaInicial = false;
    this.turnos = false;
  }

  HabilitarEdicion() {
    this.edicion = !this.edicion;
  }

  ActualizarAntecedente() {
    this._servicePacienteNuevo
      .ActualizarAntecedentes(this.antecedente)
      .subscribe(
        (antecedente) => {
          this.edicion = false;
          this._snack.Mensaje(
            "El antecedente del paciente se actualizó con éxito",
            "success"
          );
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error)
        }
      );
  }

  ActualizarConsulta() {
    this._servicePacienteNuevo
      .ActualizarConsultaInicial(this._servicePacienteNuevo.consultaInicial)
      .subscribe(
        (consulta) => {
          this.edicion = false;
          this._snack.Mensaje(
            "La consulta inicial del paciente se actualizó con éxito",
            "success"
          );
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error)
        }
      );
  }
}
