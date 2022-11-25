import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';

const routes: Routes = [
  {
    path: 'nuevo-paciente',
    component: NuevoPacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
