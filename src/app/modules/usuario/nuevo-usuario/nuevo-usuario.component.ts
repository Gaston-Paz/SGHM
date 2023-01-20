import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackService } from 'src/app/shared/services/snack.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  
  form!: FormGroup;
  Usuario:Usuario = {
    apellido:'',
    email: '',
    nombre:'',
    password:'',
    rol:''
  }
  roles:string[]=['Usuario','Admin'];
  UsuarioLogueado:Usuario = {
    apellido:'',
    email: '',
    nombre:'',
    password:'',
    rol:''
  }
  diferentes:boolean=false;

  constructor(private _formBuilder: FormBuilder, 
    private router:Router,
    private _authService:AuthService,
    private _snack:SnackService,
    private _spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      mail: [, [Validators.email, Validators.required]],
      password: [, Validators.required],
      confirmar: [, Validators.required],
      rol: [, Validators.required]
    });

    this._authService.GetUsuario(localStorage.getItem('SGHC-mail')!).subscribe(user => {
      this.UsuarioLogueado = user;
      if(this.UsuarioLogueado.rol !== 'Admin'){
        this.router.navigate(['errores/403']);
      }
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snack.Mensaje(error.message,'error');
    });
  }

  GuardarUsuario(){
    this.Usuario = {
      apellido: this.form.controls.apellido.value,
      email: this.form.controls.mail.value,
      nombre: this.form.controls.nombre.value,
      password: this.form.controls.password.value,
      rol: this.form.controls.rol.value
    }

    this._authService.GuardarUsuario(this.Usuario).subscribe(usuario => {
      this._snack.Mensaje('El usuario se guardó con éxito','success');
      this.form.reset();
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snack.Mensaje(error.message,'error');
    });

  }

  CheckConfirmPassword(){
    if(this.form.controls.confirmar.value === null)this.diferentes = false;
    else if(this.form.controls.password.value === null)this.diferentes =  false;
    else if(this.form.controls.password.value !== this.form.controls.confirmar.value)this.diferentes = true;
    else this.diferentes =  false;
    
  }
}
