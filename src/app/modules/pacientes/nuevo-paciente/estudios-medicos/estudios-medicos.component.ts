import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NuevoPacienteService } from '../../nuevo-paciente.service';

@Component({
  selector: 'app-estudios-medicos',
  templateUrl: './estudios-medicos.component.html',
  styleUrls: ['./estudios-medicos.component.css']
})
export class EstudiosMedicosComponent implements OnInit {
  previsualizacionFoto: string[] = [];

  constructor(private sanitizer: DomSanitizer,
    private _servicePacienteNuevo: NuevoPacienteService) { }

  ngOnInit(): void {
  }

  CargarFoto(ev: any) {
    let cantFotos = ev.target.files.length;
    for (let index = 0; index < cantFotos; index++) {
      const fotoCapturada = ev.target.files[index];      
      this.ExtraerBase64(fotoCapturada).then((imagen: any) => {
        this.previsualizacionFoto.push(imagen.base);
        this.SubirEstudio(fotoCapturada);
      });
      
    }
    
      
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

  SubirEstudio(archivo:any){
    this._servicePacienteNuevo.estudios.push(archivo);
  }

}
