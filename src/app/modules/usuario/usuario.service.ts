import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recuperacion } from 'src/app/core/interfaces/recuperacion.interface';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _httpClient: HttpClient) { }

  GetUsuario(mail:string){
    return this._httpClient.get<Usuario>(environment.url + "/api/usuario/" + mail);
  }

  GuardarUsuario(usuario:Usuario){
    return this._httpClient.post<Usuario>(environment.url + "/api/usuario", usuario);
  }

  GetUsuarios(){
    return this._httpClient.get<Usuario[]>(environment.url + "/api/usuario");
  }

  EliminarUsuario(id:number){
    return this._httpClient.delete<Usuario>(environment.url + "/api/usuario/" + id);
  }

  EnviarCodigo(mail:string){
    return this._httpClient.post<any>(environment.url + "/api/recuperacion/" + mail, undefined);
  }

  RecuperarContraseña(recupero: Recuperacion){
    return this._httpClient.post<any>(environment.url + "/api/recuperacion", recupero);
  }
}
