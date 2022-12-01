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
  }

  FormValid(){
    return this._servicePacienteNuevo.FormValid();
  }

  GuardarPaciente(){
    this._servicePacienteNuevo.GuardarPaciente();
  }

}
