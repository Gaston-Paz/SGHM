import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotoComponent } from './foto/foto.component';

const routes: Routes = [
  {
    path: 'foto-perfil',
    component: FotoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotoPerfilRoutingModule { }
