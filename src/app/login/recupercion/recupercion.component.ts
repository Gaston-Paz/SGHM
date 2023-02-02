import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Recuperacion } from 'src/app/core/interfaces/recuperacion.interface';
import { UsuarioService } from 'src/app/modules/usuario/usuario.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { SnackService } from 'src/app/shared/services/snack.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-recupercion',
  templateUrl: './recupercion.component.html',
  styleUrls: ['./recupercion.component.css']
})
export class RecupercionComponent implements OnInit {

  form!:FormGroup;
  tokenEnviado:boolean = true;
  recuparar:boolean = false;
  diferentes:boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private _serviceUsuario:UsuarioService,
    private _serviceError:ErrorService,
    private _spinnerService: SpinnerService,
    private _router:Router,
    private _snackService:SnackService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      mail: [, [Validators.required, Validators.email]],
      token: [, [Validators.required]],
      pass: [, [Validators.required]],
      confirmar: [, [Validators.required]],
    });    
  }

  EnviarCodigo(){
    this._serviceUsuario.EnviarCodigo(this.form.controls.mail.value).subscribe(resp => {
      this.tokenEnviado = !this.tokenEnviado;
      this.recuparar = !this.recuparar;
      this._snackService.Mensaje('Se le ha enviado un código por email para que pueda recuperar su contraseña.','success');
    },(error:HttpErrorResponse) => {
      this._serviceError.Error(error);
    })
  }

  Volver(){
    this._router.navigate(['login']);
  }

  CheckConfirmPassword(){
    if(this.form.controls.confirmar.value === null)this.diferentes = false;
    else if(this.form.controls.pass.value === null)this.diferentes =  false;
    else if(this.form.controls.pass.value !== this.form.controls.confirmar.value)this.diferentes = true;
    else this.diferentes =  false;
  }

  Recuperar(){
    let recupera: Recuperacion = {
      email: this.form.controls.mail.value,
      token: this.form.controls.token.value,
      password: this.form.controls.pass.value,
    };

    this._serviceUsuario.RecuperarContraseña(recupera).subscribe(resp=> {
      const espera = timer(3000);
      this.form.reset();
      this._snackService.Mensaje('La contraseña se modificó con éxito.','success');
      espera.subscribe(() => {
        this.Volver();
      });
    },(error:HttpErrorResponse) => {
      this._serviceError.Error(error);
    })

  }

}
