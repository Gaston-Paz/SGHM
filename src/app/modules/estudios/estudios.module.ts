import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    EstudiosComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    PacientesModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PacientesModule
  ],
  exports: [
    EstudiosComponent,
    ListarComponent
  ]
})
export class EstudiosModule { }
