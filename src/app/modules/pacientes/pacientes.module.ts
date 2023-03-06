import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersonalesComponent } from './nuevo-paciente/datos-personales/datos-personales.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntecedentesComponent } from './nuevo-paciente/antecedentes/antecedentes.component';
import { ConsultaInicialComponent } from './nuevo-paciente/consulta-inicial/consulta-inicial.component';

//Material
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EstudiosMedicosComponent } from './nuevo-paciente/estudios-medicos/estudios-medicos.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ConsultasModule } from '../consultas/consultas.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { ComponentsModule } from 'src/app/shared/Components/components.module';

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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTableModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    ConsultasModule,
    MatSelectModule,
    MatTooltipModule,
    PacientesRoutingModule,
    ComponentsModule,
    MatIconModule
  ],
  providers: [  
    MatDatepickerModule,  
  ],
  exports:[
    EstudiosMedicosComponent
  ]
})
export class PacientesModule { }
