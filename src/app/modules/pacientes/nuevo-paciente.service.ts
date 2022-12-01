import { Injectable } from "@angular/core";
import { Antecedente } from "src/app/core/interfaces/antecedentes.interface";
import { ConsultaInicial } from "src/app/core/interfaces/consulta-inicial.interface";
import { DatosPersonales } from "src/app/core/interfaces/datos-personales.interface";

@Injectable({
  providedIn: "root",
})
export class NuevoPacienteService {
  datosPersonales: DatosPersonales = {
    apellido: "",
    celular: "",
    fechaNacimiento: new Date(),
    mail: "",
    nacimiento: "",
    nombre: "",
    ocupacion: "",
    localidad: ""
  };
  datosPersonlesCompletos: boolean = false;

  consultaInicial:ConsultaInicial = {
    actividadFisica:'',
    antiguedad:'',
    atenua:'',
    caracteristica:'',
    intensidad:'',
    irradiacion:'',
    localizacion:'',
    motivo:'',
    covid:false,
    fecha:new Date(),
  };
  consultaInicialCompleta: boolean = false;

  antecedente: Antecedente = {
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

  constructor() {}

  CargarDatosPersonales(dato: string, campo: number,valido:boolean) {      
    switch (campo) {
      case 1: this.datosPersonales.nombre = dato;
        break;
      case 2: this.datosPersonales.apellido = dato;
        break;
      case 3: 
      let fechaaux = new Date(dato);
      let fecha = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()+1));
      this.datosPersonales.fechaNacimiento = fecha
        break;
      case 4: this.datosPersonales.celular = dato;
        break;
      case 5: this.datosPersonales.mail = dato;
        break;
      case 6: this.datosPersonales.ocupacion = dato;
        break;
      case 7: this.datosPersonales.nacimiento = dato;
        break;
        case 8: this.datosPersonales.localidad = dato;
        break;
    }
    this.datosPersonlesCompletos = valido;
  }

  CargarConsultaInicial(dato: string, campo: number,valido:boolean) {      
    switch (campo) {
      case 1: this.consultaInicial.actividadFisica = dato;
        break;
      case 2: this.consultaInicial.antiguedad = dato;
        break;
      case 3: 
      let fechaaux = new Date(dato);
      let fecha = new Date(fechaaux.getFullYear() +"/"+ (fechaaux.getMonth()+1)+"/"+ (fechaaux.getDate()+1));
      this.consultaInicial.fecha = fecha
        break;
      case 4: this.consultaInicial.atenua = dato;
        break;
      case 5: this.consultaInicial.caracteristica = dato;
        break;
      case 6: this.consultaInicial.intensidad = dato;
        break;
      case 7: this.consultaInicial.irradiacion = dato;
        break;
        case 8: this.consultaInicial.localizacion = dato;
        break;
        case 9: this.consultaInicial.motivo = dato;
        break;
        case 10: this.consultaInicial.covid = !this.consultaInicial.covid;
        break;
    }
    this.consultaInicialCompleta = valido;
  }

  CargarAntecedentes(antecedentes: Antecedente){
    this.antecedente = antecedentes;
  }

  FormValid(){
    return this.datosPersonlesCompletos && this.consultaInicialCompleta;
  }

  GuardarPaciente(){
    console.log('Datos personales');
    console.log(this.datosPersonales);
    console.log('-----------------');

    console.log('Consulta Inicial');
    console.log(this.consultaInicial);
    console.log('-----------------');

    console.log('Antecedentes');
    console.log(this.antecedente);
    console.log('-----------------');
    
    
  }
}
