import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Usuario } from "./core/interfaces/usuario.interface";
import { UsuarioService } from "./modules/usuario/usuario.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorService } from "./shared/services/error.service";
import { ConsultasService } from "./modules/consultas/nueva-consulta/consultas.service";
import { Router } from "@angular/router";
import { EstudiosService } from "./modules/estudios/estudios.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
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

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _usuarioService: UsuarioService,
    public _serviceError: ErrorService,
    private _serviceConsulta: ConsultasService,
    public _router: Router,
    private _serviceEstudio: EstudiosService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.userMail = localStorage.getItem("SGHC-mail")!;
    if (this.userMail !== null) {
      this._usuarioService.GetUsuario(this.userMail).subscribe(
        (user) => {
          this.Usuario = user;
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error);
        }
      );
    }
  }

  resetar(){
    this._serviceConsulta.paciente = {
      apellido: "",
      celular: "",
      fechaNacimiento: new Date(),
      email: "",
      nacio: "",
      nombre: "",
      ocupacion: "",
      localidad: "",
      otros: "",
      deParte: "",
    };
    this._serviceEstudio.paciente = {
      nombre:'',
      apellido:'',
      nacio:'',
      fechaNacimiento: new Date()
    }
    
  }

}
