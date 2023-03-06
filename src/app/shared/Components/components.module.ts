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



@NgModule({
  declarations: [
    ButtonComponent,
    SnackBarComponent,
    ModalConfirmComponent,
    ModalImagenComponent,
    MiniFabComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports:[
    ButtonComponent,
    SnackBarComponent,
    ModalConfirmComponent,
    ModalImagenComponent,
    MiniFabComponent
  ]
})
export class ComponentsModule { }
