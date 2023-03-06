import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input('habilita')habilita:boolean = false;
  @Input('valido')valido:boolean = true;
  @Input('texto')texto:string = '';
  @Output() clickButton = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  clicks(ev:MouseEvent){
    this.clickButton.emit(ev);
  }

}
