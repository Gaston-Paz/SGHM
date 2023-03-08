import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersonalesComponent } from './nuevo-paciente/datos-personales/datos-personales.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntecedentesComponent } from './nuevo-paciente/antecedentes/antecedentes.component';
import { ConsultaInicialComponent } from './nuevo-paciente/consulta-inicial/consulta-inicial.component';
import { ComponentsModule } from 'src/app/shared/Components/components.module';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { ConsultasModule } from '../consultas/consultas.module';
import { PacientesRoutingModule } from './pacientes-routing.module';

//Material
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { EstudiosModule } from '../estudios/estudios.module';

@NgModule({
  declarations: [
    NuevoPacienteComponent,
    DatosPersonalesComponent,
    ConsultaInicialComponent,
    AntecedentesComponent,
    ListarPacientesComponent
  ],
  imports: [
    PacientesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    ConsultasModule,
    ComponentsModule,
    EstudiosModule
  ],
  providers: [  
    MatDatepickerModule,  
  ]
})
export class PacientesModule { }
