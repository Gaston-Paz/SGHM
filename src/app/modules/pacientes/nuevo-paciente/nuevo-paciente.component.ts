import { Component, OnInit } from '@angular/core';
import { NuevoPacienteService } from '../nuevo-paciente.service';

@Component({
  selector: 'app-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nuevo-paciente.component.css']
})
export class NuevoPacienteComponent implements OnInit {

  constructor(private _servicePacienteNuevo: NuevoPacienteService) { }

  ngOnInit(): void {
    this._servicePacienteNuevo.ObtenerPacientes().subscribe(resp => {
      let lista = resp;
      console.log(lista);
      
    });
  }

  FormValid(){
    // return this._servicePacienteNuevo.FormValid();
    return true;
  }

  GuardarPaciente(){
    this._servicePacienteNuevo.GuardarPaciente().subscribe(resp => {

    });
  }

}
