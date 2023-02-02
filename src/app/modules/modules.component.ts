import {Component, OnInit} from '@angular/core';
import { ErrorService } from '../shared/services/error.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  constructor(public _errorService:ErrorService) {
    this._errorService.muestroMenu = true;
  }

  ngOnInit(): void {   
  }

}
