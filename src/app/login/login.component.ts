import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Credencial } from '../core/interfaces/credenciales.interface';
import { ErrorService } from '../shared/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _serviceError:ErrorService) {
      this._serviceError.muestroMenu = false;
    }

  ngOnInit(): void {
    this.CleanLocalStorage();
    this.form = this._formBuilder.group({
      mail: [, [Validators.required, Validators.email]],
      pass: [, Validators.required]
    });
  }

  Login(){

    const credencial:Credencial = {
      email: this.form.controls.mail.value,
      password: this.form.controls.pass.value
    };
    this._authService.Login(credencial).subscribe(token => {
      this._authService.SetEmail(this.form.controls.mail.value);
      localStorage.setItem('SGHC-mail',this._authService.GetEmail());      
      this._router.navigate(['home']);
    },(error:HttpErrorResponse) => {
      this._serviceError.Error(error);
    });
  }

  CleanLocalStorage(){
    localStorage.removeItem('SGHC-token');
    localStorage.removeItem('SGHC-mail');
  }


}
