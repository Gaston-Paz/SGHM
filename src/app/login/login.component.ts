import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackService } from '../shared/services/snack.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _snack:SnackService,
    private _router: Router) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      mail: [, [Validators.required, Validators.email]],
      pass: [, Validators.required]
    });
  }

  Login(){
    this._authService.Login().subscribe(token => {
      this._router.navigate(['home']);      
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snack.Mensaje(error.message,'error');
    });
  }


}
