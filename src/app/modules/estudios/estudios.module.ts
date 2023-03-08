import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiosComponent } from './nuevo-estudio/estudios.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListarComponent } from './listar/listar.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EstudiosRoutingModule } from './estudios-routing.module';
import { ComponentsModule } from 'src/app/shared/Components/components.module';
import { EstudiosMedicosComponent } from './estudios-medicos/estudios-medicos.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    EstudiosComponent,
    ListarComponent, 
    EstudiosMedicosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EstudiosRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    NgxSpinnerModule,
    ComponentsModule
  ],
  exports:[
    EstudiosComponent,
    ListarComponent
  ]
})
export class EstudiosModule { }
