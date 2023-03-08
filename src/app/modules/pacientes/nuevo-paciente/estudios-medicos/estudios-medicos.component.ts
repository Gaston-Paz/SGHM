import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { NuevoPacienteService } from '../nuevo-paciente.service';

@Component({
  selector: 'app-estudios-medicos',
  templateUrl: './estudios-medicos.component.html',
  styleUrls: ['./estudios-medicos.component.css']
})
export class EstudiosMedicosComponent implements OnInit {
  previsualizacionFoto: string[] = [];
  previsualizacionPdf: string[] = [];
  archivos: any [] = [];
  ruta:any;
  input:number = 0;

  constructor(private _sanitizer: DomSanitizer,
    private _servicePacienteNuevo: NuevoPacienteService,
    private pdfService: NgxExtendedPdfViewerService) { }

  ngOnInit(): void {
  }

  CargarFoto(ev: any) {
    let cantFotos = ev.target.files.length;    
    
    for (let index = 0; index < cantFotos; index++) {
      const fotoCapturada = ev.target.files[index];          

      this.ExtraerBase64(fotoCapturada).then((imagen: any) => {
        
        if(fotoCapturada.type.includes('pdf')){
          this.ruta= imagen.base.split(',')[1];
        }else{
          this.previsualizacionFoto.push(imagen.base);
        }
        this.SubirEstudio(fotoCapturada);
        
      });
    }
      
  }

  ExtraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this._sanitizer.bypassSecurityTrustUrl(unsafeImg);       
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = (event) => {
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

  VaciarFotos(){
    this.previsualizacionFoto = [];
    this.archivos = [];
  }

  InputCorrecto(ev:MatRadioChange){
    this.input = parseInt(ev.value);
  }

}
