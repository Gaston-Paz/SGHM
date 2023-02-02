import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoEncontradoComponent } from './errores/no-encontrado/no-encontrado.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'errores',
    loadChildren: () => import('./errores/errores.module').then(m => m.ErroresModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'errores/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
