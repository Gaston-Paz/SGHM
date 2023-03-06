import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stroked',
  templateUrl: './stroked.component.html',
  styleUrls: ['./stroked.component.css']
})
export class StrokedComponent implements OnInit {

  @Input('habilita')habilita:boolean = false;
  @Input('valido')valido:boolean = false;
  @Input('icono')icono:boolean = true;
  @Input('texto')texto:string = '';
  @Input('textoIcono')textoIcono:string = '';
  @Output() clickButton = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  clicks(ev:MouseEvent){
    this.clickButton.emit(ev);
  }

}
