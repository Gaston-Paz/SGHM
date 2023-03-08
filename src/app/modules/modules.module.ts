import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';

//Material
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import {ModulesComponent} from './modules.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        ModulesComponent
    ],
    imports: [
        CommonModule,
        ModulesRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        MatCardModule
    ]
})
export class ModulesModule { }
