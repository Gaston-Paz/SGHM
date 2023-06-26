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
import { PdfComponent } from './pdf/pdf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableSelectComponent } from './table-select/table-select.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    ButtonComponent,
    SnackBarComponent,
    ModalConfirmComponent,
    ModalImagenComponent,
    MiniFabComponent,
    StrokedComponent,
    InputsComponent,
    PdfComponent,
    TableSelectComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    NgxExtendedPdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports:[
    ButtonComponent,
    SnackBarComponent,
    ModalConfirmComponent,
    ModalImagenComponent,
    MiniFabComponent,
    StrokedComponent,
    InputsComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    PdfComponent,
    MatButtonModule,
    TableSelectComponent
  ]
})
export class ComponentsModule { }
