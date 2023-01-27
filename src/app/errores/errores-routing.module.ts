import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FatalComponent } from './fatal/fatal.component';
import { NoAutorizadoComponent } from './no-autorizado/no-autorizado.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';

const routes: Routes = [
  {
    path:'403',
    component: NoAutorizadoComponent
  },
  {
    path:'404',
    component:NoEncontradoComponent
  },
  {
    path:'500',
    component:FatalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErroresRoutingModule { }
