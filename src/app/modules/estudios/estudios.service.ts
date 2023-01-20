import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudios } from 'src/app/core/interfaces/estudio.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  constructor(private _httpClient: HttpClient) { }

  ObtenerEstudios() {
    return this._httpClient.get<Estudios[]>(environment.url+"/api/estudios");
  }
}
