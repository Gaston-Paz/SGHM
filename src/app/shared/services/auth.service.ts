import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Credencial } from 'src/app/core/interfaces/credenciales.interface';
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  user:Credencial = {
    email: "gaspaz12@gmail.com",
    password: "gP1158174335"
  }

  Login(){
    
    return this._httpClient.post<any>(
      environment.url + "/login",this.user, {
        observe:'response'
      }).pipe(map((response:HttpResponse<any>) => {
        console.log(response);
        
          const body = response.body;
          const header = response.headers;
          const bearerToken = header.get('Authorization');
          
          const token = bearerToken?.replace('Bearer ','');
          console.log(token);
          localStorage.setItem('token',token!);
          console.log(this.GetToken());
          console.log(localStorage);
          
          return body;
      }));
  }

  GetToken(){
    return localStorage.getItem('token');
  }
}
