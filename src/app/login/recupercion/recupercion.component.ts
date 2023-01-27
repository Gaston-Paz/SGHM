import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/modules/usuario/usuario.service';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-recupercion',
  templateUrl: './recupercion.component.html',
  styleUrls: ['./recupercion.component.css']
})
export class RecupercionComponent implements OnInit {

  form!:FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _serviceUsuario:UsuarioService,
    private _serviceError:ErrorService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      mail: [, [Validators.required, Validators.email]]
    });
  }

  Recuperar(){
    this._serviceUsuario.RecuperarContraseña(this.form.controls.mail.value).subscribe(resp => {

    },(error:HttpErrorResponse) => {
      this._serviceError.Error(error);
    })
  }

}
