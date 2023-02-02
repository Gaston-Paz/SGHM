import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import { Usuario } from "./core/interfaces/usuario.interface";
import { UsuarioService } from "./modules/usuario/usuario.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorService } from "./shared/services/error.service";
import { AuthService } from "./shared/services/auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "SGHC";
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  Usuario: Usuario = {
    apellido: "",
    email: "",
    id: 0,
    nombre: "",
    password: "",
    rol: "",
  };
  userMail: string = "";
  muestroMenu: boolean = false;
  Nav: any[] = [];
  fillerNav: any = [
    {
      text: "Nuevo Usuario",
      url: "home/usuarios/nuevo-usuario",
    },
    {
      text: "Usuarios",
      url: "home/usuarios/listar-usuarios",
    },
    {
      text: "Nuevo Paciente",
      url: "home/pacientes/nuevo-paciente",
    },
    {
      text: "Foto de Perfil Paciente",
      url: "home/foto/nueva",
    },
    {
      text: "Pacientes",
      url: "home/pacientes/listar-pacientes",
    },
    {
      text: "Nueva Consulta TTO",
      url: "home/consultas/nueva-consulta",
    },
    {
      text: "Consultas TTO",
      url: "home/consultas/listar-consultas",
    },
    {
      text: "Nuevos Estudios",
      url: "home/estudios/nuevo-estudio",
    },
    {
      text: "Estudios",
      url: "home/estudios/listar-estudios",
    },
    {
      text: "Cerrar sesión",
      url: "/login",
    },
  ];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private _usuarioService: UsuarioService,
    public _serviceError: ErrorService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this._serviceError.muestroMenu = this.MuestroMenu();
  }

  ngOnInit(): void {
    this.userMail = localStorage.getItem("SGHC-mail")!;
    if (this.userMail !== null) {
      this._usuarioService.GetUsuario(this.userMail).subscribe(
        (user) => {
          this.Usuario = user;
          if (this.Usuario.rol === "Usuario") {
            this.Nav = this.fillerNav.filter(
              (n: { usuario: any }) => n.usuario
            );
          } else {
            this.Nav = this.fillerNav;
          }
        },
        (error: HttpErrorResponse) => {}
      );
    }
  }

  MuestroMenu() {
    this.muestroMenu = (
      this.router.url.includes("errores") ||
      this.router.url.includes("login") ||
      this.router.url === "/"
    );
    if (this.muestroMenu) {
      if (this.Usuario.rol === "Usuario") {
        this.Nav = this.fillerNav.filter((n: { usuario: any }) => n.usuario);
      } else {
        this.Nav = this.fillerNav;
      }
    }
    return this.muestroMenu;
  }


}
