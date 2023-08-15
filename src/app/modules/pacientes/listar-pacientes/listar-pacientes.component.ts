import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, OnDestroy } from "@angular/core";
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
import { ModalConfirmComponent } from "src/app/shared/Components/modal-confirm/modal-confirm.component";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-listar-pacientes",
  templateUrl: "./listar-pacientes.component.html",
  styleUrls: ["./listar-pacientes.component.css"],
})
export class ListarPacientesComponent implements OnInit, OnDestroy {
  pacientes: Paciente[] = [];
  displayedColumns: string[] = [
    'select',
    'foto',
    'nombreYapellido',
    'edad',
    'nacio',
    'ocupacion',
    'localidad',
    'email',
    'celular',
    'deParte'
  ];
  titulosTabla:string[] = [
    '',
    'Foto',
    'Nombre y Apellido',
    'Edad',
    '¿Cómo nació?',
    'Ocupación',
    'Localidad',
    'Email',
    'Celular',
    'De parte de'
  ]

  pacientesVer: boolean = true;
  antecedentes: boolean = false;
  consultaInicial: boolean = false;
  consultaNueva: boolean = false;
  estudiosNuevos: boolean = false;
  datos: boolean = false;
  estudios: boolean = false;
  turnos: boolean = false;
  nombrePaciente: string = "";
  iconAdd: string = "add";
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
  textButtonTTO:string = 'Tratamientos';
  textButtonDatos:string = 'Datos Personales';
  textButtonEstudio:string = 'Nuevo Estudio';
  iconoAgregar:boolean = true;
  noHabilitaEliminar:boolean = true;
  buscador:string = '';
  filtro:string='';
  filtroAux:string='-';
  itemSeleccionado:any;
  @ViewChild('datos')datosPersonales:DatosPersonalesComponent;
  subscribes:any[]=[];
  pagina:number = 0;

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

  ngOnDestroy(): void {
    this.subscribes.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this._serviceConsulta.paciente = {};
    this._serviceConsulta.editartto = {};
    this.filtro = this._servicePacienteNuevo.filtro;
    this.filtroAux = this.filtro === '' ? '-' : this.filtro;
    this._servicePacienteNuevo.InicializarObjetos();
    this._servicePacienteNuevo.datosPersonlesCompletos = false;          
    this._servicePacienteNuevo.consultaInicialCompleta = false;          
    this._servicePacienteNuevo.tratamientoCompleto = false;  
    this._servicePacienteNuevo.InicializarObjetos();
    this.noHabilitaEliminar = this._serviceError.rol === "Secretaria";
    this.validarTamañoPantalla(window.innerWidth);
    this.mail = localStorage.getItem("SGHC-mail")!;
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePacienteNuevo.ObtenerPacientesPaginado(this.pagina, this.filtroAux ));
    if (this.mail !== null) obs.push(this._usuarioService.GetUsuario(this.mail));

    this.subscribes.push(forkJoin(obs).subscribe(
      (resp) => {        
        this.parsearFechaDeNacimientoConListado(resp[0]);

        
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
    ));
  }

  VerDatos(){  
      this.datos = true;
      this.antecedentes = false;
      this.pacientesVer = false;
      this.estudiosNuevos = false;
      this.estudios = false;
      this.consultaInicial = false;
      this.consultaNueva = false;
      this.turnos = false;
      this.pacienteEditar = this.itemSeleccionado;
  }

  VerAntecedentes() {
    console.log(this.itemSeleccionado.idPaciente!)
    this._serviceListados
      .ObtenerAntecedentePorId(this.itemSeleccionado.idPaciente!)
      .subscribe(
        (resp) => { 
          console.log(resp)        
          this.antecedente = resp;
          this.antecedentes = true;
          this.pacientesVer = false;
          this.estudiosNuevos = false;
          this.estudios = false;
          this.consultaInicial = false;
          this.consultaNueva = false;
          this.turnos = false;
          this.datos = false;
          this.nombrePaciente = this.itemSeleccionado.nombre!;
          this.apellidoPaciente = this.itemSeleccionado.apellido!;
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error)
        }
      );
  }

  VerConsultas() { 
    this._serviceListados.ObtenerConsultaPorId(this.itemSeleccionado.idPaciente).subscribe(
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
        this.nombrePaciente = this.itemSeleccionado.nombre!;
        this.apellidoPaciente = this.itemSeleccionado.apellido!;
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
    this._serviceConsulta.paciente = {};
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

  verTurnos() {
    this._serviceConsulta.paciente = this.itemSeleccionado;
    this.antecedentes = false;
    this.pacientesVer = false;
    this.consultaInicial = false;
    this.estudiosNuevos = false;
    this.estudios = false;
    this.turnos = true;
    this.consultaNueva = false;
    this.datos = false;
  }

  NuevaConsulta() {
    this.idPaciente = this.itemSeleccionado;
    this._serviceConsulta.editartto = {
      fecha: new Date(),
      pacienteId: 0,
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

  Estudios() {
    this.idPaciente = this.itemSeleccionado;
    this._serviceEstudio.paciente = this.itemSeleccionado;
    this.consultaNueva = false;
    this.antecedentes = false;
    this.pacientesVer = false;
    this.consultaInicial = false;
    this.turnos = false;
    this.estudiosNuevos = false;
    this.estudios = true;
    this.datos = false;
  }

  NuevoEstudio() {
    this.idPaciente = this.itemSeleccionado;
    this._serviceEstudio.paciente = this.itemSeleccionado;
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

  EliminarPaciente(){
    let paciente = this.itemSeleccionado;
    let dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "¿Desea eliminar al paciente " + paciente.nombre + " " + paciente.apellido + "?",
        buttonText: {
          ok: "Eliminar",
          cancel: "Cancelar",
        },
        action: "Confirmar",
      }
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
          this._servicePacienteNuevo.EliminarPaciente(paciente).subscribe(resp => {
            this.pacientes = [];
            this._snack.Mensaje("El paciente se eliminó con éxito","success");
            resp.forEach((r: Paciente) => {
              r.fechaNacimiento = new Date(r.fechaNacimiento!);
              var fechaInicio = new Date(r.fechaNacimiento).getTime();
              var fechaFin = new Date().getTime();
              var diff = fechaFin - fechaInicio;
              r.edad = diff / (1000 * 60 * 60 * 24 * 365);
              this.pacientes.push(r);
            });
    
            this.pacientes = this.pacientes.sort((a, b) => {
              if (a.apellido! < b.apellido!) return -1;
              else return 1;
            });

            this.filtro = '';
          },(error) => {
            this._serviceError.Error(error);
          });
      }
      
    });

  }

  resetFilter(ev:any){
    this._servicePacienteNuevo.filtro = ev;
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

    if(innerWidth > 1160){
      this.textButtonTTO = "Tratamientos";
      this.displayedColumns = [
        'select',
        'foto',
        'nombreYapellido',
        'edad',
        'nacio',
        'ocupacion',
        'localidad',
        'email',
        'celular',
        'deParte'
    ];
    }else{
      this.iconAdd = '';
      this.textButtonTTO = "TTO";
      this.displayedColumns = [
        'select',
        'nombreYapellido',
        'edad',
        'nacio',
        'ocupacion',
        'localidad',
        'email',
        'celular',
        'deParte'
    ];
    }

    if(innerWidth < 1120){
      this.textButtonPrimeraConsulta = '1° Cons';
    }
  }

  onPage(pagina:number){
    pagina == 1 ? this.pagina += 5 : this.pagina-=5;
    if(this.pagina < 0)this.pagina = 0;
    this.pacientes = [];
    this._servicePacienteNuevo.ObtenerPacientesPaginado(this.pagina, this.filtroAux).subscribe({
      next: (resp) => {
        this.parsearFechaDeNacimientoConListado(resp);
      },
      error: (error) => {
        this._serviceError.Error(error);
      }
    })
  }

  buscarPorNombre(){
    this.filtroAux = this.filtro === '' ? '-' : this.filtro;
    this.pagina = 0;
    this.pacientes = [];
    this._servicePacienteNuevo.ObtenerPacientesPaginado(this.pagina,this.filtroAux).subscribe({
      next: (resp) => {
        this.parsearFechaDeNacimientoConListado(resp);
      this.filtro = '';
    },
      error: (error) => {
        this._serviceError.Error(error);
      }});
    
  }

  parsearFechaDeNacimientoConListado(lista:any[]){
    lista.forEach((r: Paciente) => {
      r.fechaNacimiento = new Date(r.fechaNacimiento!);
      var fechaInicio = new Date(r.fechaNacimiento).getTime();
      var fechaFin = new Date().getTime();
      var diff = fechaFin - fechaInicio;
      r.edad = parseInt((diff / (1000 * 60 * 60 * 24 * 365)).toFixed(0));
      r.nombreYapellido = `${r.nombre} ${r.apellido}`
      this.pacientes.push(r);
    });
  }

  onKeyPressBuscar(ev:any){
    this.filtro = ev;
    this.buscarPorNombre();
  }

  Descargar(){
    this._servicePacienteNuevo.DescargarExcel();
  }

}
