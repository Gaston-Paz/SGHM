import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotoPerfilRoutingModule } from './foto-perfil-routing.module';
import { FotoComponent } from './foto/foto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    FotoComponent
  ],
  imports: [
    CommonModule,
    FotoPerfilRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxSpinnerModule
  ]
})
export class FotoPerfilModule { }
