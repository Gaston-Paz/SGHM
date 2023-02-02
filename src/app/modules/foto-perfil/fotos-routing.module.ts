import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { FotoComponent } from './foto/foto.component';

const routes: Routes = [
  {
    path: 'nueva',
    component:FotoComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotosRoutingModule { }
