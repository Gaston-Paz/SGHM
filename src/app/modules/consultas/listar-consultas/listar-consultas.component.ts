import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { Tratamiento } from 'src/app/core/interfaces/tratamiento.interface';
import { SnackService } from 'src/app/shared/services/snack.service';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';
import { ConsultasService } from '../nueva-consulta/consultas.service';

@Component({
  selector: 'app-listar-consultas',
  templateUrl: './listar-consultas.component.html',
  styleUrls: ['./listar-consultas.component.css']
})
export class ListarConsultasComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['fecha', 'motivo', 'sedestacion','sugerencias','proximoTurnoIndicado'];
  pacientes:Paciente[]=[];
  pacientesFilter: Paciente[] = [];
  tratamientos:Tratamiento[]=[];
  tratamientosFiltrados:Tratamiento[]=[];
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
  form!:FormGroup;
  filtroPaciente:string = '';
  subscribes:any[]=[];

  constructor(private _servicePaciente:NuevoPacienteService,
    private _snackBar: MatSnackBar,
    private _spinnerService: NgxSpinnerService,
    private _serviceTratamiento:ConsultasService,
    private _formBuilder:FormBuilder,
    private _snack:SnackService) { }

  ngOnDestroy(): void {
    this.subscribes.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      paciente: [this._serviceTratamiento.paciente.idPaciente !== undefined && this._serviceTratamiento.paciente.idPaciente !== null ? this._serviceTratamiento.paciente.idPaciente : this.paciente.idPaciente]
    });
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePaciente.ObtenerPacientes());
    obs.push(this._serviceTratamiento.ObtenerConsultas());
    this.subscribes.push(forkJoin(obs).subscribe(resp => {    
      this.pacientes = resp[0];
      this.pacientesFilter = resp[0];
      this.tratamientos = resp[1];
      if(this._serviceTratamiento.paciente.idPaciente !== undefined && this._serviceTratamiento.paciente.idPaciente !== null) {
        this.buscarTratamientos();
      }
      
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snack.Mensaje(error.error.message,'error');
    }));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buscarTratamientos(){
    this.paciente = this.pacientes.find(x => x.idPaciente === this._serviceTratamiento.paciente.idPaciente)!;
    this.tratamientosFiltrados = [];
    this.tratamientos.forEach(t => {
      if(t.paciente?.idPaciente === this.form.controls.paciente.value)this.tratamientosFiltrados.push(t);
    });
    this.dataSource.data = this.tratamientosFiltrados.sort((a,b) => {
      if(a.fecha! > b.fecha!)return -1;
      else return 1;
    });
  }

  applyFilterPaciente(espacio:boolean){
    let filter = this.filtroPaciente + "";
    if(espacio) filter += "";
    this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes));
    if(filter != 'undefined') this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes.filter(x => x.apellido.toUpperCase().includes(filter.toUpperCase()) || x.nombre.toUpperCase().includes(filter.toUpperCase()))));
  }



}
