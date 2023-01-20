import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Credencial } from 'src/app/core/interfaces/credenciales.interface';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  private userMail:string = "";

  Login(user:Credencial){
    
    return this._httpClient.post<any>(
      environment.url + "/login",user, {
        observe:'response'
      }).pipe(map((response:HttpResponse<any>) => {       
          const body = response.body;
          const header = response.headers;
          const bearerToken = header.get('Authorization');
          const token = bearerToken?.replace('Bearer ','');
          localStorage.setItem('SGHC-token',token!);        
          return body;
      }));
  }

  GetToken(){
    return localStorage.getItem('SGHC-token');
  }

  SetEmail(mail:string){
    this.userMail = mail;
  }

  GetEmail(){
    return this.userMail;
  }

  GetUsuario(mail:string){
    return this._httpClient.get<Usuario>("http://localhost:8080/usuario/" + mail);
  }

  GuardarUsuario(usuario:Usuario){
    return this._httpClient.post<Usuario>("http://localhost:8080/usuario", usuario);
  }
}
