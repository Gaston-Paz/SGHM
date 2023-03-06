import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './buttons/button/button.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MiniFabComponent } from './buttons/mini-fab/mini-fab.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StrokedComponent } from './buttons/stroked/stroked.component';
import { InputsComponent } from './inputs/inputs.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ButtonComponent,
    SnackBarComponent,
    ModalConfirmComponent,
    ModalImagenComponent,
    MiniFabComponent,
    StrokedComponent,
    InputsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[
    ButtonComponent,
    SnackBarComponent,
    ModalConfirmComponent,
    ModalImagenComponent,
    MiniFabComponent,
    StrokedComponent,
    InputsComponent
  ]
})
export class ComponentsModule { }