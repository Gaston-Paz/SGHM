import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosPersonales } from 'src/app/core/interfaces/datos-personales.interface';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
})
export class DatosPersonalesComponent implements OnInit {
  datosPersonales: DatosPersonales = {
    apellido: '',
    celular: '',
    edad: 0,
    fechaNacimiento: new Date(),
    mail: '',
    nacimiento: '',
    nombre: '',
    ocupacion: '',
  };

  form!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      apellido: ['',Validators.required],
      celular: ['',Validators.required],
      edad: [,Validators.required],
      fechaNacimiento: [,Validators.required],
      mail: ['',[Validators.required,Validators.email]],
      nacimiento: ['',Validators.required],
      nombre: ['',Validators.required],
      ocupacion: ['',Validators.required],
    });
  }
}
