import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';

const routes: Routes = [
  {
    path: 'listar',
    component:ListarPacientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nuevo-paciente',
    component:NuevoPacienteComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
