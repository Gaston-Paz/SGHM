import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { ModulesComponent } from './modules.component';

const routes: Routes = [
  {
    path: 'pacientes',
    loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'consultas',
    loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'estudios',
    loadChildren: () => import('./estudios/estudios.module').then(m => m.EstudiosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'foto',
    loadChildren: () => import('./foto-perfil/foto-perfil.module').then(m => m.FotoPerfilModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
