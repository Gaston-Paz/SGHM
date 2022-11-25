import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { DatosPersonalesComponent } from './nuevo-paciente/datos-personales/datos-personales.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';

//Material
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NuevoPacienteComponent,
    DatosPersonalesComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PacientesModule { }
