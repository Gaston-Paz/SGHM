import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      mail: [, Validators.required, Validators.email],
      pass: [, Validators.required]
    });
  }

  Login(){
    this._authService.Login().subscribe(token => {
      console.log(token);
      
    });
  }
}
