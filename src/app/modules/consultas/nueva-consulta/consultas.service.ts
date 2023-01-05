import { HttpClient, HttpParams } from "@angular/common/http";
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
    celular: "",
    fechaNacimiento: new Date(),
    email: "",
    nacio: "",
    nombre: "",
    ocupacion: "",
    localidad: "",
    fotoPerfil: "",
  };
  
  constructor(private _httpClient: HttpClient) {}

  //Métodos HTTP
  ObtenerConsultas() {
    return this._httpClient.get<Tratamiento[]>(environment.url + "/tratamiento/");
  }

  GuardarConsultas(tratamiento:Tratamiento) {
    return this._httpClient.post<Tratamiento>(environment.url + "/tratamiento/",tratamiento);
  }


}
