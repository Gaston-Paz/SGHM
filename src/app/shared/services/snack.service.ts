import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../Components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private _snackBar: MatSnackBar) { }

  Mensaje(mensaje:string, clase:string){
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        mensaje: mensaje,
      },
      horizontalPosition: "center",
      panelClass: clase,
    });
  }

}
