import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
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
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxSpinnerModule,
    ComponentsModule
  ]
})
export class LoginModule { }
