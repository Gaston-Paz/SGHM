import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudiosRoutingModule } from './estudios-routing.module';
import { EstudiosComponent } from './nuevo-estudio/estudios.component';
import { PacientesModule } from '../pacientes/pacientes.module';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ListarComponent } from './listar/listar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    EstudiosComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    EstudiosRoutingModule,
    PacientesModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule
  ]
})
export class EstudiosModule { }
