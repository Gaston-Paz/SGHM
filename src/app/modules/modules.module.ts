import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';

//Material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ModulesComponent } from './modules.component';
import { PacientesModule } from "./pacientes/pacientes.module";
import { ConsultasModule } from './consultas/consultas.module';
import { FotoPerfilModule } from './foto-perfil/foto-perfil.module';
import { EstudiosModule } from './estudios/estudios.module';

@NgModule({
    declarations: [
        ModulesComponent
    ],
    imports: [
        CommonModule,
        ModulesRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        NgxSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        PacientesModule,
        ConsultasModule,
        FotoPerfilModule, 
        EstudiosModule
    ]
})
export class ModulesModule { }
