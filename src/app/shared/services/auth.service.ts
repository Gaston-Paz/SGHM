import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  Login(){
    return this._httpClient.post<any>(
      environment.url + "/login",
      {
        email:"gaspaz12@gmail.com",
        password:"gP1158174335"
      }
    );
  }
}
