import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';

const routes: Routes = [
  {
    path: 'nuevo-paciente',
    component: NuevoPacienteComponent
  },
  {
    path: 'listar-pacientes',
    component: ListarPacientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
