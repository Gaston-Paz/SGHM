import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { NuevaConsultaComponent } from './nueva-consulta/nueva-consulta.component';

const routes: Routes = [
  {
    path: 'nueva-consulta',
    component:NuevaConsultaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-consultas',
    component:ListarConsultasComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
