import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Antecedente } from 'src/app/core/interfaces/antecedentes.interface';
import { NuevoPacienteService } from '../nuevo-paciente.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css'],
  encapsulation : ViewEncapsulation.None
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
    if(!this.antecedente.embarazos){
      this.antecedente.abortosEspontaneo = undefined; 
      this.antecedente.abortosInducido = undefined; 
      this.antecedente.partos = undefined; 
    }
    this._servicePacienteNuevo.CargarAntecedentes(this.antecedentes);
  }
  
  asignarValor(valor:string,campo:number){      
    if(valor !== "" ){
      this.MapAntecedente(valor,campo);  
    }
    if(!this.antecedente.ortodoncia)this.antecedente.edadOrtodoncia = undefined; 
    if(!this.antecedente.embarazos){
      this.antecedente.abortosEspontaneo = undefined; 
      this.antecedente.abortosInducido = undefined; 
      this.antecedente.partos = undefined; 
    }
    console.log(this.antecedentes);
    this._servicePacienteNuevo.CargarAntecedentes(this.antecedentes);
    
  }

  MapAntecedente(valor:any,campo:number){
    switch (campo) {
      case 1:this.antecedentes.cirugias = valor;break;
      case 2:this.antecedentes.implanteSuperior = valor;break;
      case 3:this.antecedentes.implanteInferior = valor;break;
      case 4:this.antecedentes.piezasFaltantesSup = valor;break;
      case 5:this.antecedentes.piezasFaltantesInf = valor;break;
      case 6:this.antecedentes.protesis = valor;break;
      case 7:this.antecedentes.contencion = valor;break;
      case 8:this.antecedentes.placaDescanso = valor;break;
      case 9:this.antecedentes.ortodoncia = valor;break;
      case 10:this.antecedentes.edadOrtodoncia = valor;break;
      case 11:this.antecedentes.menstruacion = valor;break;
      case 12:this.antecedentes.frecuencia = valor;break;
      case 13:this.antecedentes.duracion = valor;break;
      case 14:this.antecedentes.volumen = valor;break;
      case 15:this.antecedentes.embarazos = valor;break;
      case 16:this.antecedentes.abortosInducido = valor;break;
      case 17:this.antecedentes.abortosEspontaneo = valor;break;
      case 18:this.antecedentes.partos = valor;break;
      case 19:this.antecedentes.intestinal = valor;break;
      case 20:this.antecedentes.digestivo = valor;break;
      case 21:this.antecedentes.cardiaco = valor;break;
      case 22:this.antecedentes.urogenital = valor;break;
      case 23:this.antecedentes.respiratorio = valor;break;
      case 24:this.antecedentes.oseo = valor;break;
      case 25:this.antecedentes.fuma = valor;break;
      case 26:this.antecedentes.otrasDrogas = valor;break;
      case 27:this.antecedentes.accidentes = valor;break;
      case 28:this.antecedentes.diabetes = valor;break;
      case 29:this.antecedentes.medicacion = valor;break;
      case 30:this.antecedentes.fracturas = valor;break;
      case 31:this.antecedentes.dolorCabeza = valor;break;
      case 32:this.antecedentes.tiroides = valor;break;
      case 33:this.antecedentes.otros = valor;break;
      case 34:this.antecedentes.alimentacion = valor;break;
      case 35:this.antecedentes.perdidas = valor;break;
    }
  }

}
