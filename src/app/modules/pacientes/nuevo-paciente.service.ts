import { Injectable } from "@angular/core";
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

  FormValid(){
    return this.datosPersonlesCompletos;
  }
}
