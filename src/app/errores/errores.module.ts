import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErroresRoutingModule } from './errores-routing.module';
import { NoAutorizadoComponent } from './no-autorizado/no-autorizado.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { FatalComponent } from './fatal/fatal.component';
import { ComponentsModule } from '../shared/Components/components.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    NoAutorizadoComponent,
    NoEncontradoComponent,
    FatalComponent
  ],
  imports: [
    CommonModule,
    ErroresRoutingModule,
    ComponentsModule,
    MatIconModule
  ]
})
export class ErroresModule { }
