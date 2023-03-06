import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ComponentsModule } from 'src/app/shared/Components/components.module';



@NgModule({
  declarations: [
    NuevoUsuarioComponent,
    ListarUsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    UsuariosRoutingModule,
    ComponentsModule
  ]
})
export class UsuarioModule { }
