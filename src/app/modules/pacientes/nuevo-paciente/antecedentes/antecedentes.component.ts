import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Antecedente } from 'src/app/core/interfaces/antecedentes.interface';
import { NuevoPacienteService } from '../nuevo-paciente.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit {

  form!: FormGroup;
  antecedentes: Antecedente = {
    diabetes:false,
    embarazos:false,
    menstruacion:false,
    ortodoncia:false,
    placaDescanso:false,
    contencion:false

  }
  fumador: string[]=['Tabaco','Marihuana','Ambos'];
  tiroides: string[]=['Hipotiroidismo','Hipertiroidismo'];
  @Input("antecedente") antecedente!: Antecedente;
  @Input("hayAntecedente") hayAntecedente: boolean = false;
  @Input("edicion") edicion: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private _servicePacienteNuevo: NuevoPacienteService) { }

  ngOnInit(): void {   
    this.form = this._formBuilder.group({
      cirugias: [],
      implanteInferior: [],
      implanteSuperior: [],
      ortodoncia: [false],
      EdadOrtodoncia: [],
      piezasfaltantesSup: [],
      piezasfaltantesInf: [],
      placaDescanso: [false],
      menstruacion: [false],
      perdidas: [],
      frecuencia: [],
      partos: [],
      abortoInducido: [],
      abortoEspontaneo: [],
      duracion: [],
      volumen: [],
      intestinal: [],
      digestivo: [],
      cardiaco: [],
      urogenital: [],
      respiratorio: [],
      accidentes: [],
      medicacion: [],
      fracturas: [],
      dolorCabeza: [],
      tiroides: [],
      otros: [],
      alimentacion: [],
      protesis: [],
      oseo: [],
      fuma: [],
      otrasDrogas: [],
      contencion: [false],
      diabetes: [false],
      embarazos: [false],
    });
    if(this.hayAntecedente)this.antecedentes = this.antecedente;    
  }

  CargarAntecedentes(){ 
    if(!this.antecedente.ortodoncia)this.antecedente.edadOrtodoncia = undefined; 
    this._servicePacienteNuevo.CargarAntecedentes(this.antecedentes);
  }

}
