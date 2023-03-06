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
  valida:boolean = false;
  @Output() cambio = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  cambios(ev:any){           
    this.cambio.emit(ev.target.value)
  }

  valido(ev:any){
    this.valida = ev.target.value === "";    
  }

}
