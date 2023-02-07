import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppComponent } from '../app.component';
import { Credencial } from '../core/interfaces/credenciales.interface';
import { UsuarioService } from '../modules/usuario/usuario.service';
import { ErrorService } from '../shared/services/error.service';
import { SnackService } from '../shared/services/snack.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  public fillerNav: any = [
    {
      text: "Nuevo Usuario",
      url: "home/usuarios/nuevo-usuario",
    },
    {
      text: "Usuarios",
      url: "home/usuarios/listar-usuarios",
    },
    {
      text: "Nuevo Paciente",
      url: "home/pacientes/nuevo-paciente",
    },
    {
      text: "Foto de Perfil Paciente",
      url: "home/foto/nueva",
    },
    {
      text: "Pacientes",
      url: "home/pacientes/listar-pacientes",
    },
    {
      text: "Nueva Consulta TTO",
      url: "home/consultas/nueva-consulta",
    },
    {
      text: "Consultas TTO",
      url: "home/consultas/listar-consultas",
    },
    {
      text: "Nuevos Estudios",
      url: "home/estudios/nuevo-estudio",
    },
    {
      text: "Estudios",
      url: "home/estudios/listar-estudios",
    },
    {
      text: "Cerrar sesión",
      url: "/login",
    },
  ];

  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _serviceError:ErrorService,
    private _snackService:SnackService,
    private _usuarioService:UsuarioService) {
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
      this._serviceError.muestroMenu = true; 
      this._authService.SetEmail(this.form.controls.mail.value);
      localStorage.setItem('SGHC-mail',this._authService.GetEmail()); 
        this._usuarioService.GetUsuario(this.form.controls.mail.value).subscribe(
        (user) => {
          
          this._serviceError.Usuario = user;
          if (user.rol === "Usuario") {
            this._serviceError.Nav = this.fillerNav.filter(
                      (n:any) => !n.text.includes('Usuario')
                    );
                  } else {
                    this._serviceError.Nav = this.fillerNav;
                  }
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error);
        }
      );
      this._router.navigate(['home']);
      
    },(error:HttpErrorResponse) => {
      this._snackService.Mensaje('Email o contraseña incorrecta','error');
    });
  }

  CleanLocalStorage(){
    localStorage.removeItem('SGHC-token');
    localStorage.removeItem('SGHC-mail');
  }


}
