import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class InputsComponent implements OnInit {

  @Input('label')label:string = '';
  @Input('valor')valor:string = '';
  @Input('tabindex')tabindex:number = 0;
  @Input('placeHolder')placeHolder:string = '';
  @Input('type')type:string = '';
  @Input('requerido')requerido:boolean = false;
  @Input('readOnly')readOnly:boolean = false;
  validaRequerido:boolean = false;
  validaMail:boolean = false;
  @Output() cambio = new EventEmitter<any>();
  msj:string = 'pepe';

  constructor() { }

  ngOnInit(): void {
  }

  cambios(ev:any){           
    this.cambio.emit(ev.target.value)
  }

  valido(ev:any){
    if(this.type === 'email') {
      
      if(ev.target.value.length < 3){
        if(ev.target.value.length > 0)this.validaMail = true;
        else this.validaMail = false;
      }
      else if(!ev.target.value.includes('@')) this.validaMail = true;
      else if(ev.target.value.includes('@')){
        let formato =  ev.target.value.split('@');
        if(formato[0] === "" || formato[1] === "")this.validaMail = true;
        else this.validaMail = false;
      }else this.validaMail = false;
      
    }
    this.validaRequerido = ev.target.value === "";    

    if(this.validaMail) this.msj = `El formato del e-mail es incorrect`;
    else if(this.validaRequerido) this.msj = `${this.label} es obligatorio`
  }

}
