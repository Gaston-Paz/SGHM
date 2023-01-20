import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    NuevoUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    NgxSpinnerModule
  ],
  exports:[NuevoUsuarioComponent]
})
export class UsuarioModule { }
