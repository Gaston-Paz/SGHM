import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecupercionComponent } from './recupercion/recupercion.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from '../shared/Components/components.module';



@NgModule({
  declarations: [
    LoginComponent,
    RecupercionComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgxSpinnerModule,
    ComponentsModule
  ]
})
export class LoginModule { }
