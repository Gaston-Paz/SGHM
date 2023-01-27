import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules/modules.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'errores',
    loadChildren: () => import('./errores/errores.module').then(m => m.ErroresModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
