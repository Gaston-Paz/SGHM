import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { EstudiosComponent } from './nuevo-estudio/estudios.component';

const routes: Routes = [
  {
    path: 'estudios',
    component: EstudiosComponent
  },
  {
    path: 'listar-estudios',
    component: ListarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiosRoutingModule { }
