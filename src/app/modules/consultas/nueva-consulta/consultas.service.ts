import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { Tratamiento } from "src/app/core/interfaces/tratamiento.interface";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ConsultasService {
  paciente: Paciente = {
    apellido: "",
    fechaNacimiento: new Date(),
    nacio: "",
    nombre: ""
  };

  editartto: Tratamiento = {
    fecha: new Date(),
    pacienteId: 0,
    motivo: "",
    sedestacion: "",
    paciente:{
      apellido:'',
      fechaNacimiento: new Date(),
      nacio:'',
      nombre:''
    }
  };

  constructor(private _httpClient: HttpClient) {}

  //Métodos HTTP
  ObtenerConsultas() {
    return this._httpClient.get<Tratamiento[]>(
      environment.url + "/api/tratamiento"
    );
  }

  ObtenerPorPaciente(paciente:Paciente) {
    return this._httpClient.patch<Tratamiento[]>(
      environment.url + "/api/tratamiento/obtenerPorPaciente",paciente
    );
  }

  GuardarConsultas(tratamiento: Tratamiento) {
    return this._httpClient.post<Tratamiento>(
      environment.url + "/api/tratamiento",
      tratamiento
    );
  }
}
