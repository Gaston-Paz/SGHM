import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NuevoPacienteService } from "../nuevo-paciente.service";

@Component({
  selector: "app-datos-personales",
  templateUrl: "./datos-personales.component.html",
  styleUrls: ["./datos-personales.component.css"],
})
export class DatosPersonalesComponent implements OnInit {

  fotos: any = [];
  previsualizacionFoto: string = "";
  form!: FormGroup;
  fecha: Date = new Date();
  nacimientos: string[] = ['Vaginal','Cesarea'];
  pipe = new DatePipe('es-ES');
  edad:string="";

  constructor(
    private _formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    private _servicePacienteNuevo: NuevoPacienteService,
    private _dateAdapter: DateAdapter<Date>
  ) {
    this._dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.fecha = new Date(Date.now());
    this.form = this._formBuilder.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      fechaNacimiento: [, Validators.required],
      nacimiento: ["", Validators.required],
      otros: [""],
      ocupacion: [""],
      localidad: [,],
      mail: ["", [Validators.email]],
      celular: [""],
      deParte: [""],
      foto: [""],
    });
   
  }

  CargarFoto(ev: any) {
    const fotoCapturada = ev.target.files[0];
    this.ExtraerBase64(fotoCapturada).then((imagen: any) => {
      this.previsualizacionFoto = imagen.base;
      this.SubirImagen(ev.target.files[0]);
    });
  }

  ExtraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this._sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
        return null;
      } catch (e) {
        return null;
      }
  });

  CargarDatosPersonales(dato: any, campo: number) {   
    let valor = "";
    if(campo === 7) valor = dato.value;
    else valor = dato.target.value; 
    this._servicePacienteNuevo.CargarDatosPersonales(valor,campo, this.form.valid);
  }

  SubirImagen(archivo:any){
    this._servicePacienteNuevo.imagen = archivo;
  }

  changeDate(date:any){
    let dateParts = date.value.split('/');
    let fechaInput = new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]).getTime();
    let fecha = new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]);
    this.form.controls.fechaNacimiento.setValue(fecha);   
    this._servicePacienteNuevo.CargarDatosPersonales(fecha,3, this.form.valid); 

    //Calcular edad
    var fechaInicio = new Date(fecha).getTime();
    var fechaFin = new Date().getTime();
    var diff = fechaFin - fechaInicio;
    this.edad = (diff / (1000 * 60 * 60 * 24 * 365)).toString().split(".")[0];
  }

}
