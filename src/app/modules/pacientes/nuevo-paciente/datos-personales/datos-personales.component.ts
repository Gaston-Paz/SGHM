import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { NuevoPacienteService } from "../../nuevo-paciente.service";

@Component({
  selector: "app-datos-personales",
  templateUrl: "./datos-personales.component.html",
  styleUrls: ["./datos-personales.component.css"],
})
export class DatosPersonalesComponent implements OnInit {

  fotos: any = [];
  previsualizacionFoto: string = "";
  form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private _servicePacienteNuevo: NuevoPacienteService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      apellido: ["", Validators.required],
      celular: ["", Validators.required],
      localidad: [, Validators.required],
      fechaNacimiento: [, Validators.required],
      mail: ["", [Validators.required, Validators.email]],
      nacimiento: ["", Validators.required],
      nombre: ["", Validators.required],
      ocupacion: ["", Validators.required],
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
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
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
    this._servicePacienteNuevo.CargarDatosPersonales(dato.target.value,campo, this.form.valid);
  }

  SubirImagen(archivo:any){
    this._servicePacienteNuevo.imagen = archivo;
  }

  // CargarImagen(file:FormData){
  //   this._servicePacienteNuevo.datosPersonales.fotoPerfil = async (file: Blob) =>{
  //       return new Promise((resolve,reject) => {
  //         try {
  //           let reader = new FileReader();
  //           let fileByteArray: any = [];
  //           reader.readAsArrayBuffer(file);
  //           reader.onloadend = (evt) => {
  //             if(evt.target!.readyState === FileReader.DONE){
  //               const arrayBuffer: ArrayBuffer = evt.target!.result;
  //               const array = new Uint8Array(arrayBuffer);
  //               array.forEach((item) => fileByteArray.push(item));
  //             }
  //             resolve(fileByteArray);
  //           }
  //         } catch (e) {
  //           reject(e);
  //         }
  //       });
  //   }
  // }
}
