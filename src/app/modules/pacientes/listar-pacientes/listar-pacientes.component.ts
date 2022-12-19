import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatedTabHeader } from '@angular/material/tabs/paginated-tab-header';
import { Antecedente } from 'src/app/core/interfaces/antecedentes.interface';
import { ConsultaInicial } from 'src/app/core/interfaces/consulta-inicial.interface';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NuevoPacienteService } from '../nuevo-paciente/nuevo-paciente.service';
import { ListadosService } from './listados.service';

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit,AfterViewInit  {

  pacientes:Paciente[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['nombre', 'apellido', 'mail', 'nacimiento','foto','antecedentes','consultaInicial','turnos'];
  dataSource = new MatTableDataSource();
  pacientesVer: boolean = true;
  antecedentes: boolean = false;
  consultaInicial: boolean = false;
  turnos: boolean = false;
  nombrePaciente: string = "";
  apellidoPaciente: string = "";
  antecedente: Antecedente = {
    abortos: "",
    accidentes: "",
    alimentacion: "",
    cardiaco: "",
    cirugias: "",
    diabetes: false,
    digestivo: "",
    dolorCabeza: "",
    duracion: "",
    edadOrtodoncia: 0,
    embarazos: false,
    fracturas: "",
    frecuencia: "",
    implanteInferior: "",
    implanteSuperior: "",
    intestinal: "",
    medicacion: "",
    menstruacion: false,
    ortodoncia: false,
    otros: "",
    partos: "",
    perdidas: "",
    piezasFaltantes: "",
    placaDescanso: false,
    respiratorio: "",
    urogenital: "",
    volumen: "",
    tiroides: "",
  };
  consultas: ConsultaInicial = {
    actividadFisica: "",
    antiguedad: "",
    atenua: "",
    caracteristica: "",
    intensidad: "",
    irradiacion: "",
    localizacion: "",
    motivo: "",
    covid: false,
    fecha: new Date(),
  };

  constructor(private _servicePacienteNuevo: NuevoPacienteService,
    private _spinnerService: SpinnerService,
    private _serviceListados: ListadosService) { }

  ngOnInit(): void {
    this._servicePacienteNuevo.ObtenerPacientes().subscribe(
      (resp) => {
        resp.forEach(r => {
          r.fechaNacimiento = new Date(r.fechaNacimiento);
          let variables = r.fotoPerfil.toString().split("\\");         
          r.fotoPerfil = "..//..//..//..//assets//" + variables[8] + "//" + variables[9] + "//" + variables[10] ;
          this.pacientes.push(r);
        });

        this.dataSource.data = this.pacientes;
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        
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

  VerAntecedentes(element:Paciente){

    this._serviceListados.ObtenerAntecedentePorId(element.idPaciente!).subscribe(resp => {
      this.antecedente = resp;
      this.antecedentes = true;
      this.pacientesVer = false;
      this.consultaInicial = false;
      this.turnos = false;
  
      this.nombrePaciente = element.nombre;
      this.apellidoPaciente = element.apellido;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
      
    }
  );


  }

  VerConsultas(element:Paciente){

    this._serviceListados.ObtenerConsultaPorId(element.idPaciente!).subscribe(resp => {
      this.consultas = resp;
      this.antecedentes = false;
      this.pacientesVer = false;
      this.consultaInicial = true;
      this.turnos = false;
  
      this.nombrePaciente = element.nombre;
      this.apellidoPaciente = element.apellido;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
      
    }
  );


  }

  Volver(){
    this.antecedentes = false;
    this.pacientesVer = true;
    this.consultaInicial = false;
    this.turnos = false;
  }

}
