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
      console.log(imagen);
      this.previsualizacionFoto = imagen.base;
    });
    // this.fotos.push(fotoCapturada);
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
}
