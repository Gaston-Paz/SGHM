import { HttpErrorResponse } from "@angular/common/http";
import { toBase64String } from "@angular/compiler/src/output/source_map";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { throwToolbarMixedModesError } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { Usuario } from "src/app/core/interfaces/usuario.interface";
import { ModalConfirmComponent } from "src/app/shared/Components/modal-confirm/modal-confirm.component";
import { AuthService } from "src/app/shared/services/auth.service";
import { SnackService } from "src/app/shared/services/snack.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { UsuarioService } from "../usuario.service";

@Component({
  selector: "app-listar-usuarios",
  templateUrl: "./listar-usuarios.component.html",
  styleUrls: ["./listar-usuarios.component.css"],
})
export class ListarUsuariosComponent implements OnInit, AfterViewInit {
  UsuarioLogueado: Usuario = {
    apellido: "",
    email: "",
    nombre: "",
    password: "",
    rol: "",
  };
  usuarios: Usuario[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["apellido", "nombre", "mail", "rol", "delete"];

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _snack: SnackService,
    private _spinnerService: SpinnerService,
    private _usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let obs: Array<Observable<any>> = [];
    obs.push(
      this._usuarioService.GetUsuario(localStorage.getItem("SGHC-mail")!)
    );
    obs.push(this._usuarioService.GetUsuarios());
    forkJoin(obs).subscribe(
      (resp) => {
        this.UsuarioLogueado = resp[0];
        if (this.UsuarioLogueado.rol !== "Admin") {
          this.router.navigate(["errores/403"]);
        }
        this.usuarios = resp[1];
        this.dataSource.data = this.usuarios;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this._snack.Mensaje(error.message, "error");
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  EliminarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        message:
          "¿Desea eliminar al usuario " +
          usuario.nombre +
          " " +
          usuario.apellido +
          "?",
        buttonText: {
          ok: "Eliminar",
          cancel: "Cancelar",
        },
        action: "Confirmar",
      },
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this._usuarioService.EliminarUsuario(usuario.id!).subscribe(
          (resp) => {
            this._snack.Mensaje("Usuario eliminado con éxito", "success");
            this._usuarioService.GetUsuarios().subscribe(
              (users) => {
                this.dataSource.data = users;
                this.usuarios = users;
              },
              (error: HttpErrorResponse) => {
                console.log(error);
                this._snack.Mensaje(error.message, "error");
              }
            );
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this._snack.Mensaje(error.message, "error");
          }
        );
      }
    });
  }
}
