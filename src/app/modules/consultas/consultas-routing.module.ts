import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { NuevaConsultaComponent } from './nueva-consulta/nueva-consulta.component';

const routes: Routes = [
  {
    path: 'nueva-consulta',
    component: NuevaConsultaComponent
  },
  {
    path: 'listar-consultas',
    component: ListarConsultasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
