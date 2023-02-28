import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { Usuario } from "src/app/core/interfaces/usuario.interface";
import { ModalConfirmComponent } from "src/app/shared/Components/modal-confirm/modal-confirm.component";
import { ErrorService } from "src/app/shared/services/error.service";
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
    private _router: Router,
    private _snack: SnackService,
    private _spinnerService: SpinnerService,
    private _usuarioService: UsuarioService,
    private _dialog: MatDialog,
    private _serviceError:ErrorService
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
          this._router.navigate(["errores/403"]);
        }
        this._serviceError.Usuario = resp[0];
        if(this._serviceError.Usuario.rol === "Admin")this._serviceError.Nav = this._serviceError.fillerNav;
          else this._serviceError.Nav = this._serviceError.fillerNav.filter((f:any) => !f.text.toUpperCase().includes('USUARIO'));
          this._serviceError.muestroMenu = true;
        this.usuarios = resp[1];
        this.dataSource.data = this.usuarios;
      },
      (error: HttpErrorResponse) => {
        this._serviceError.Error(error);
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
    const dialogRef = this._dialog.open(ModalConfirmComponent, {
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
                this._serviceError.Error(error);
              }
            );
          },
          (error: HttpErrorResponse) => {
            this._serviceError.Error(error);
          }
        );
      }
    });
  }
}
