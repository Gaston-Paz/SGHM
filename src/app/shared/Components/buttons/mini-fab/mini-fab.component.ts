import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mini-fab',
  templateUrl: './mini-fab.component.html',
  styleUrls: ['./mini-fab.component.css']
})
export class MiniFabComponent implements OnInit {

  @Input('clase')clase:string = '';
  @Input('posicionTooltip')posicionTooltip:string = '';
  @Input('textoTooltip')textoTooltip:string = '';
  @Input('icon')icon:string = '';
  @Output() clickButton = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  clicks(ev:MouseEvent){
    this.clickButton.emit(ev);
  }

}


