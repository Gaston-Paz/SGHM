import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent
  // },
  {
    path: 'pacientes',
    loadChildren: () => import('./modules/pacientes/pacientes.module').then(m => m.PacientesModule)
  },
  {
    path: 'consultas',
    loadChildren: () => import('./modules/consultas/consultas.module').then(m => m.ConsultasModule)
  },
  {
    path: 'estudios',
    loadChildren: () => import('./modules/estudios/estudios.module').then(m => m.EstudiosModule)
  }
  ,
  {
    path: 'foto',
    loadChildren: () => import('./modules/foto-perfil/foto-perfil.module').then(m => m.FotoPerfilModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
