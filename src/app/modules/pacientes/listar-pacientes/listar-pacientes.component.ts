import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { forkJoin, Observable } from "rxjs";
import { Antecedente } from "src/app/core/interfaces/antecedentes.interface";
import { ConsultaInicial } from "src/app/core/interfaces/consulta-inicial.interface";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { ErrorService } from "src/app/shared/services/error.service";
import { SnackService } from "src/app/shared/services/snack.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { ConsultasService } from "../../consultas/nueva-consulta/consultas.service";
import { EstudiosService } from "../../estudios/estudios.service";
import { UsuarioService } from "../../usuario/usuario.service";
import { DatosPersonalesComponent } from "../nuevo-paciente/datos-personales/datos-personales.component";
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
    "nombre",
    "nacimiento",
    "foto",
    "datos",
    "antecedentes",
    "consultaInicial",
    "consultas",
    "estudios",
    "nuevaConsulta",
    "nuevoEstudio"
  ];

  dataSource = new MatTableDataSource();
  pacientesVer: boolean = true;
  antecedentes: boolean = false;
  consultaInicial: boolean = false;
  consultaNueva: boolean = false;
  estudiosNuevos: boolean = false;
  datos: boolean = false;
  estudios: boolean = false;
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
  pacienteEditar: Paciente = {
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

  mail:string='';
  textButtonAntecedente:string = 'Antecedentes';
  textButtonPrimeraConsulta:string = 'Primera Consulta';
  textButtonConsulta:string = 'Nueva Consulta';
  textButtonDatos:string = 'Datos Personales';
  textButtonEstudio:string = 'Nuevo Estudio';
  iconoAgregar:boolean = true;

  @ViewChild('datos')datosPersonales:DatosPersonalesComponent;

  constructor(
    private _servicePacienteNuevo: NuevoPacienteService,
    private _spinnerService: SpinnerService,
    private _serviceListados: ListadosService,
    private _serviceConsulta: ConsultasService,
    private _snack: SnackService,
    private _serviceError:ErrorService,
    private _usuarioService:UsuarioService,
    private _serviceEstudio:EstudiosService,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.validarTamañoPantalla(window.innerWidth);
    this.mail = localStorage.getItem("SGHC-mail")!;
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePacienteNuevo.ObtenerPacientes());
    if (this.mail !== null) obs.push(this._usuarioService.GetUsuario(this.mail));
  

    forkJoin(obs).subscribe(
      (resp) => {
        resp[0].forEach((r: Paciente) => {
          r.fechaNacimiento = new Date(r.fechaNacimiento!);
          var fechaInicio = new Date(r.fechaNacimiento).getTime();
          var fechaFin = new Date().getTime();
          var diff = fechaFin - fechaInicio;
          r.edad = diff / (1000 * 60 * 60 * 24 * 365);
          this.pacientes.push(r);
        });

        this.dataSource.data = this.pacientes.sort((a, b) => {
          if (a.apellido! < b.apellido!) return -1;
          else return 1;
        });

        if (this.mail !== null){
          this._serviceError.Usuario = resp[1];
          if(this._serviceError.Usuario.rol === "Admin")this._serviceError.Nav = this._serviceError.fillerNav;
          else this._serviceError.Nav = this._serviceError.fillerNav.filter((f:any) => !f.text.toUpperCase().includes('USUARIO'));
          this._serviceError.muestroMenu = true;
        }
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

  VerDatos(element:Paciente){  
      this.datos = true;
      this.antecedentes = false;
      this.pacientesVer = false;
      this.estudiosNuevos = false;
      this.estudios = false;
      this.consultaInicial = false;
      this.consultaNueva = false;
      this.turnos = false;
      this.pacienteEditar = element;
  }

  VerAntecedentes(element: Paciente) {
    this._serviceListados
      .ObtenerAntecedentePorId(element.idPaciente!)
      .subscribe(
        (resp) => {         
          this.antecedente = resp;
          this.antecedentes = true;
          this.pacientesVer = false;
          this.estudiosNuevos = false;
          this.estudios = false;
          this.consultaInicial = false;
          this.consultaNueva = false;
          this.turnos = false;
          this.datos = false;
          this.nombrePaciente = element.nombre!;
          this.apellidoPaciente = element.apellido!;
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
        this.estudiosNuevos = false;
        this.estudios = false;
        this.consultaInicial = true;
        this.consultaNueva = false;
        this.turnos = false;
        this.datos = false;
        this.nombrePaciente = element.nombre!;
        this.apellidoPaciente = element.apellido!;
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
    this.estudiosNuevos = false;
    this.estudios = false;
    this.datos = false;
    this._serviceConsulta.paciente = {
      apellido: "",
      fechaNacimiento: new Date(),
      nombre: "",
      nacio: ""
    };
  }

  VolverDeConsultaNueva() {
    this._serviceConsulta.paciente = this.idPaciente;
    this.edicion = false;
    this.antecedentes = false;
    this.pacientesVer = false;
    this.consultaInicial = false;
    this.turnos = true;
    this.consultaNueva = false;
    this.estudiosNuevos = false;
    this.estudios = false;
    this.datos = false;
  }

  verTurnos(paciente: Paciente) {
    this._serviceConsulta.paciente = paciente;
    this.antecedentes = false;
    this.pacientesVer = false;
    this.consultaInicial = false;
    this.estudiosNuevos = false;
    this.estudios = false;
    this.turnos = true;
    this.consultaNueva = false;
    this.datos = false;
  }

  NuevaConsulta(paciente: Paciente) {
    this.idPaciente = paciente!;
    this._serviceConsulta.editartto = {
      fecha: new Date(),
      idPaciente: 0,
      motivo: "",
      sedestacion: "",
      paciente:{
        apellido:'',
        fechaNacimiento: new Date(),
        nacio:'',
        nombre:''
      }
    }
    this.consultaNueva = true;
    this.antecedentes = false;
    this.pacientesVer = false;
    this.consultaInicial = false;
    this.estudiosNuevos = false;
    this.estudios = false;
    this.turnos = false;
    this.datos = false;
  }

  Estudios(paciente: Paciente) {
    this.idPaciente = paciente!;
    this._serviceEstudio.paciente = paciente;
    this.consultaNueva = false;
    this.antecedentes = false;
    this.pacientesVer = false;
    this.consultaInicial = false;
    this.turnos = false;
    this.estudiosNuevos = false;
    this.estudios = true;
    this.datos = false;
  }

  NuevoEstudio(paciente: Paciente) {
    this.idPaciente = paciente!;
    this._serviceEstudio.paciente = paciente;
    this.consultaNueva = false;
    this.antecedentes = false;
    this.pacientesVer = false;
    this.consultaInicial = false;
    this.turnos = false;
    this.estudiosNuevos = true;
    this.estudios = false;
    this.datos = false;
  }

  HabilitarEdicion() {
    this.edicion = !this.edicion;
  }

  ActualizarDatos(){
    this.pacienteEditar.nombre = this.datosPersonales.form.controls.nombre.value;
    this.pacienteEditar.apellido = this.datosPersonales.form.controls.apellido.value;
    this.pacienteEditar.fechaNacimiento = this.datosPersonales.form.controls.fechaNacimiento.value;
    this.pacienteEditar.nacio = this.datosPersonales.form.controls.nacimiento.value;
    this.pacienteEditar.otros = this.datosPersonales.form.controls.otros.value;
    this.pacienteEditar.ocupacion = this.datosPersonales.form.controls.ocupacion.value;
    this.pacienteEditar.localidad = this.datosPersonales.form.controls.localidad.value;
    this.pacienteEditar.email = this.datosPersonales.form.controls.mail.value;
    this.pacienteEditar.celular = this.datosPersonales.form.controls.celular.value;
    this.pacienteEditar.deParte = this.datosPersonales.form.controls.deParte.value;
    this.pacienteEditar.idPaciente = this.datosPersonales.form.controls.id.value;
    
    this._servicePacienteNuevo
    .ActualizarDatosPersonales(this.pacienteEditar)
    .subscribe(
      (paciente) => {
        this.edicion = false;
        this._snack.Mensaje(
          "Los datos personales del paciente se actualizaron con éxito",
          "success"
        );
      },
      (error: HttpErrorResponse) => {
        this._serviceError.Error(error)
      }
    );
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

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.validarTamañoPantalla(event.target.innerWidth);
  }

  validarTamañoPantalla(innerWidth:number){
    if(innerWidth < 1580){
      this.textButtonAntecedente = 'Ant';
      this.textButtonPrimeraConsulta = '1° Consulta';
    }else{
      this.textButtonAntecedente = 'Antecedentes';
      this.textButtonPrimeraConsulta = 'Primera Consulta';
    }

    if(innerWidth < 1418){
      this.textButtonEstudio = "Estudio";
      this.textButtonConsulta = "Consulta";
      this.iconoAgregar = false;
    }else{
      this.iconoAgregar = true;
      this.textButtonConsulta = "Nueva Consulta";
      this.textButtonEstudio = "Nuevo Estudio";
    }

    if(innerWidth < 1492){
      this.textButtonDatos = "Datos";
    }else{
      this.textButtonDatos = "Datos Personales";
    }

    if(innerWidth > 1210){
      this.displayedColumns = [
        "nombre",
        "nacimiento",
        "foto",
        "datos",
        "antecedentes",
        "consultaInicial",
        "consultas",
        "estudios",
        "nuevaConsulta",
        "nuevoEstudio"
    ];
    }else{
      this.displayedColumns = [
        "nombre",
        "nacimiento",
        "datos",
        "antecedentes",
        "consultaInicial",
        "consultas",
        "estudios",
        "nuevaConsulta",
        "nuevoEstudio"
    ];
    }
  }


}
