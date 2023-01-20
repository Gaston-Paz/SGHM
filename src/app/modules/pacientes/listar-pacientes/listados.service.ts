import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Antecedente } from 'src/app/core/interfaces/antecedentes.interface';
import { ConsultaInicial } from 'src/app/core/interfaces/consulta-inicial.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {

  constructor(private _httpClient: HttpClient) { }

  ObtenerAntecedentePorId(idAntecedente:number) {
    return this._httpClient.get<Antecedente>(environment.url + "/api/antecedentes/" + idAntecedente);
  }

  ObtenerAntecedentes() {
    return this._httpClient.get<Antecedente[]>(environment.url + "/api/antecedentes");
  }

  ObtenerConsultaPorId(idConsulta:number) {
    return this._httpClient.get<ConsultaInicial>(environment.url + "/api/consulta-inicial/" + idConsulta);
  }

  ObtenerConsultas() {
    return this._httpClient.get<ConsultaInicial[]>(environment.url + "/api/consulta-inicial");
  }
}
