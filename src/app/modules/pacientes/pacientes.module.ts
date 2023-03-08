import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersonalesComponent } from './nuevo-paciente/datos-personales/datos-personales.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntecedentesComponent } from './nuevo-paciente/antecedentes/antecedentes.component';
import { ConsultaInicialComponent } from './nuevo-paciente/consulta-inicial/consulta-inicial.component';
import { ComponentsModule } from 'src/app/shared/Components/components.module';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { EstudiosMedicosComponent } from './nuevo-paciente/estudios-medicos/estudios-medicos.component';
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
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    NuevoPacienteComponent,
    DatosPersonalesComponent,
    ConsultaInicialComponent,
    AntecedentesComponent,
    ListarPacientesComponent,
    EstudiosMedicosComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    NgxSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    ConsultasModule,
    MatSelectModule,
    PacientesRoutingModule,
    ComponentsModule,
    MatRadioModule
  ],
  providers: [  
    MatDatepickerModule,  
  ],
  exports:[
    EstudiosMedicosComponent
  ]
})
export class PacientesModule { }
