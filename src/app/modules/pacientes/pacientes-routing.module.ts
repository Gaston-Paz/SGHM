import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';

const routes: Routes = [
  {
    path: 'listar-pacientes',
    component:ListarPacientesComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'nuevo-paciente',
    component:NuevoPacienteComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
