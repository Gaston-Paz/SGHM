import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { NuevoPacienteService } from '../nuevo-paciente.service';

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit {

  pacientes:Paciente[] = [];

  constructor(private _servicePacienteNuevo: NuevoPacienteService) { }

  ngOnInit(): void {
    this._servicePacienteNuevo.ObtenerPacientes().subscribe(
      (resp) => {
        resp.forEach(r => {
          r.fechaNacimiento = new Date(r.fechaNacimiento);
          let variables = r.fotoPerfil.toString().split("\\");
          console.log(variables);
          
          r.fotoPerfil = "..//..//..//..//assets//" + variables[8] + "//" + variables[9] + "//" + variables[10] ;
          this.pacientes.push(r);
        });

        this.dataSource.data = this.pacientes;
        
      },
      (error: HttpErrorResponse) => {}
    );
  }

  displayedColumns: string[] = ['nombre', 'apellido', 'mail', 'nacimiento','foto','historia'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
