import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tratamiento } from "src/app/core/interfaces/tratamiento.interface";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ConsultasService {
  
  constructor(private _httpClient: HttpClient) {}

  //Métodos HTTP
  ObtenerConsultas() {
    return this._httpClient.get<Tratamiento[]>(environment.url + "/tratamiento/");
  }

  GuardarConsultas(tratamiento:Tratamiento) {
    return this._httpClient.post<Tratamiento>(environment.url + "/tratamiento/",tratamiento);
  }


}
