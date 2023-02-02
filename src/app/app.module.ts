import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InterceptorTokenInterceptor } from './shared/services/interceptor-token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnackBarComponent } from './shared/Components/snack-bar/snack-bar.component';
import { ModalConfirmComponent } from './shared/Components/modal-confirm/modal-confirm.component';
import { InterceptorService } from './shared/services/interceptor.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ModulesModule } from './modules/modules.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ModalImagenComponent } from './shared/Components/modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    AppComponent,
    SnackBarComponent,
    ModalConfirmComponent,
    ModalImagenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    ModulesModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
