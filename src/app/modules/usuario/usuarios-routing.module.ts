import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';

const routes: Routes = [
  {
    path: 'listar-usuarios',
    component:ListarUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nuevo-usuario',
    component:NuevoUsuarioComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
