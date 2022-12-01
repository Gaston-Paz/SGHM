import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Antecedente } from 'src/app/core/interfaces/antecedentes.interface';
import { NuevoPacienteService } from '../../nuevo-paciente.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit {

  form!: FormGroup;
  antecedentes: Antecedente = {
    abortos:'',
    accidentes:'',
    alimentacion:'',
    cardiaco:'',
    cirugias:'',
    diabetes:false,
    digestivo:'',
    dolorCabeza:'',
    duracion:'',
    EdadOrtodoncia:0,
    embarazos:false,
    fracturas:'',
    frecuencia:'',
    implanteInferior:'',
    implanteSuperior:'',
    intestinal:'',
    medicacion:'',
    menstruacion:false,
    ortodoncia:false,
    otros:'',
    partos:'',
    perdidas:'',
    piezasfaltantes:'',
    placaDescanso:false,
    respiratorio:'',
    urogenital:'',
    volumen:'',
    tiroides:''
  }

  constructor(private _formBuilder: FormBuilder,
    private _servicePacienteNuevo: NuevoPacienteService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      cirugias: [""],
      implanteInferior: [""],
      implanteSuperior: [""],
      ortodoncia: [false],
      EdadOrtodoncia: [""],
      piezasfaltantes: [""],
      placaDescanso: [false],
      menstruacion: [false],
      perdidas: [""],
      frecuencia: [""],
      partos: [""],
      duracion: [""],
      volumen: [""],
      intestinal: [""],
      digestivo: [""],
      cardiaco: [""],
      urogenital: [""],
      respiratorio: [""],
      accidentes: [""],
      medicacion: [""],
      fracturas: [""],
      dolorCabeza: [""],
      tiroides: [""],
      otros: [""],
      alimentacion: [""],
      diabetes: [false],
    });
  }

  CargarAntecedentes(){  
    this._servicePacienteNuevo.CargarAntecedentes(this.antecedentes);
  }

}