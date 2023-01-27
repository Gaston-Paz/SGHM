import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/usuario.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { SnackService } from 'src/app/shared/services/snack.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { UsuarioService } from '../usuario.service';

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
  @Input('usuario')usuarioEditar:Usuario ={
    apellido:'',
    email: '',
    nombre:'',
    password:'',
    rol:''
  }

  constructor(private _formBuilder: FormBuilder, 
    private router:Router,
    private _authService:AuthService,
    private _snack:SnackService,
    private _spinnerService: SpinnerService,
    private _usuarioService: UsuarioService,
    private _serviceError:ErrorService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nombre: [this.usuarioEditar.nombre !== '' ? this.usuarioEditar.nombre : '', Validators.required],
      apellido: [this.usuarioEditar.apellido !== '' ? this.usuarioEditar.apellido : '', Validators.required],
      mail: [this.usuarioEditar.email !== '' ? this.usuarioEditar.email : '', [Validators.email, Validators.required]],
      password: [this.usuarioEditar.password !== '' ? this.usuarioEditar.password : '', Validators.required],
      confirmar: [this.usuarioEditar.password !== '' ? this.usuarioEditar.password : '', Validators.required],
      rol: [this.usuarioEditar.rol !== '' ? this.usuarioEditar.rol : '', Validators.required],
      id: [this.usuarioEditar.id !== undefined ? this.usuarioEditar.id : undefined]
    });

    this._usuarioService.GetUsuario(localStorage.getItem('SGHC-mail')!).subscribe(user => {
      this.UsuarioLogueado = user;
      if(this.UsuarioLogueado.rol !== 'Admin'){
        this.router.navigate(['errores/403']);
      }
    },(error:HttpErrorResponse) => {
      this._serviceError.Error(error);
    });
  }

  GuardarUsuario(){
    this.Usuario = {
      apellido: this.form.controls.apellido.value,
      email: this.form.controls.mail.value,
      nombre: this.form.controls.nombre.value,
      password: this.form.controls.password.value,
      rol: this.form.controls.rol.value,
      id: this.form.controls.id.value
    }

    this._usuarioService.GuardarUsuario(this.Usuario).subscribe(usuario => {
      this._snack.Mensaje('El usuario se guardó con éxito','success');
      this.form.reset();
    },(error:HttpErrorResponse) => {
      this._serviceError.Error(error);
    });

  }

  CheckConfirmPassword(){
    if(this.form.controls.confirmar.value === null)this.diferentes = false;
    else if(this.form.controls.password.value === null)this.diferentes =  false;
    else if(this.form.controls.password.value !== this.form.controls.confirmar.value)this.diferentes = true;
    else this.diferentes =  false;
  }
}
