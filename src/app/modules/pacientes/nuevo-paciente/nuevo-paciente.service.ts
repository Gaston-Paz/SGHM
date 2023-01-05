import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AltaPaciente } from "src/app/core/interfaces/alta-paciente.interface";
import { Antecedente } from "src/app/core/interfaces/antecedentes.interface";
import { ConsultaInicial } from "src/app/core/interfaces/consulta-inicial.interface";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class NuevoPacienteService {
  datosPersonales: Paciente = {
    apellido: "",
    celular: "",
    fechaNacimiento: new Date(),
    email: "",
    nacio: "",
    nombre: "",
    ocupacion: "",
    localidad: "",
    fotoPerfil: "",
  };
  datosPersonlesCompletos: boolean = false;

  consultaInicial: ConsultaInicial = {
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
  consultaInicialCompleta: boolean = false;

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

  imagen: Blob = new Blob();

  alta: AltaPaciente = {
    paciente: {
      apellido: "",
      celular: "",
      fechaNacimiento: new Date(),
      email: "",
      nacio: "",
      nombre: "",
      ocupacion: "",
      localidad: "",
      fotoPerfil: "",
    },
    consultaInicial: {
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
    },
    antecedente: {
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
    },
  };

  estudios: Blob[] = [];

  constructor(private _httpClient: HttpClient) {}

  CargarDatosPersonales(dato: string, campo: number, valido: boolean) {
    switch (campo) {
      case 1:
        this.datosPersonales.nombre = dato;
        break;
      case 2:
        this.datosPersonales.apellido = dato;
        break;
      case 3:
        let fechaaux = new Date(dato);
        let fecha = new Date(
          fechaaux.getFullYear() +
            "/" +
            (fechaaux.getMonth() + 1) +
            "/" +
            (fechaaux.getDate() - 1)
        );
        this.datosPersonales.fechaNacimiento = fecha;
        break;
      case 4:
        this.datosPersonales.celular = dato;
        break;
      case 5:
        this.datosPersonales.email = dato;
        break;
      case 6:
        this.datosPersonales.ocupacion = dato;
        break;
      case 7:
        this.datosPersonales.nacio = dato;
        break;
      case 8:
        this.datosPersonales.localidad = dato;
        break;
    }
    this.datosPersonlesCompletos = valido;
  }

  CargarConsultaInicial(dato: string, campo: number, valido: boolean) {
    switch (campo) {
      case 1:
        this.consultaInicial.actividadFisica = dato;
        break;
      case 2:
        this.consultaInicial.antiguedad = dato;
        break;
      case 3:
        let fechaaux = new Date(dato);
        let fecha = new Date(
          fechaaux.getFullYear() +
            "/" +
            (fechaaux.getMonth() + 1) +
            "/" +
            (fechaaux.getDate() - 1)
        );
        this.consultaInicial.fecha = fecha;
        break;
      case 4:
        this.consultaInicial.atenua = dato;
        break;
      case 5:
        this.consultaInicial.caracteristica = dato;
        break;
      case 6:
        this.consultaInicial.intensidad = dato;
        break;
      case 7:
        this.consultaInicial.irradiacion = dato;
        break;
      case 8:
        this.consultaInicial.localizacion = dato;
        break;
      case 9:
        this.consultaInicial.motivo = dato;
        break;
      case 10:
        this.consultaInicial.covid = !this.consultaInicial.covid;
        break;
    }
    this.consultaInicialCompleta = valido;
  }

  CargarAntecedentes(antecedentes: Antecedente) {
    this.antecedente = antecedentes;    
  }

  FormValid() {
    if (this.datosPersonlesCompletos && this.consultaInicialCompleta) {
      this.alta.paciente = this.datosPersonales;
      this.alta.consultaInicial = this.consultaInicial;
      return true;
    }
    return false;
  }

  InicializarObjetos(){
    this.datosPersonales = {
      apellido: "",
      celular: "",
      fechaNacimiento: new Date(),
      email: "",
      nacio: "",
      nombre: "",
      ocupacion: "",
      localidad: "",
      fotoPerfil: "",
    };
    this.consultaInicial = {
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
    this.antecedente = {
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
    this.estudios = [];
  }

  //Métodos HTTP
  GuardarFoto(formData: FormData, idPaciente: number, esEstudio: boolean) {    
    return this._httpClient.post<Paciente>(
      environment.url + "/paciente/" + idPaciente + "/" + esEstudio,
      formData
    );
  }

  ObtenerPacientes() {
    return this._httpClient.get<Paciente[]>("http://localhost:8080/paciente");
  }

  GuardarPaciente() {
    this.alta.paciente = this.datosPersonales;
    this.alta.antecedente = this.antecedente;
    this.alta.consultaInicial = this.consultaInicial;
    return this._httpClient.post<Paciente>(
      environment.url + "/paciente/",
      this.alta
    );
  }


}
