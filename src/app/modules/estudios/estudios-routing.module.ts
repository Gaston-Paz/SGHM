import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ListarComponent } from './listar/listar.component';
import { EstudiosComponent } from './nuevo-estudio/estudios.component';

const routes: Routes = [
  {
    path: 'nuevo-estudio',
    component:EstudiosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar',
    component:ListarComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiosRoutingModule { }
