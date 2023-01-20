import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErroresRoutingModule } from './errores-routing.module';
import { NoAutorizadoComponent } from './no-autorizado/no-autorizado.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';


@NgModule({
  declarations: [
    NoAutorizadoComponent,
    NoEncontradoComponent
  ],
  imports: [
    CommonModule,
    ErroresRoutingModule
  ]
})
export class ErroresModule { }
