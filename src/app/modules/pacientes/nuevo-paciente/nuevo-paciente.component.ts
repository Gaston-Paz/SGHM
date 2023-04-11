import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NuevoPacienteService } from "./nuevo-paciente.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { ConsultaInicialComponent } from "./consulta-inicial/consulta-inicial.component";
import { DatosPersonalesComponent } from "./datos-personales/datos-personales.component";
import { AntecedentesComponent } from "./antecedentes/antecedentes.component";
import { SnackService } from "src/app/shared/services/snack.service";
import { ErrorService } from "src/app/shared/services/error.service";
import { timer } from "rxjs";
import { Router } from "@angular/router";
import { UsuarioService } from "../../usuario/usuario.service";
@Component({
  selector: "app-nuevo-paciente",
  templateUrl: "./nuevo-paciente.component.html",
  styleUrls: ["./nuevo-paciente.component.css"],
})
export class NuevoPacienteComponent implements OnInit, OnDestroy {
  @ViewChild(DatosPersonalesComponent)
  private datosPersonales!: DatosPersonalesComponent;

  @ViewChild(ConsultaInicialComponent)
  private consultaInicial!: ConsultaInicialComponent;

  @ViewChild(AntecedentesComponent)
  private antecedentes!: AntecedentesComponent;

  subscribes:any[]=[];

  mail:string='';

  constructor(
    private _servicePacienteNuevo: NuevoPacienteService,
    private _snack: SnackService,
    private _spinnerService: SpinnerService,
    private _serviceError:ErrorService,
    private _router:Router,
    private _usuarioService: UsuarioService
  ) {}

  ngOnDestroy(): void {
    this.subscribes.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this._servicePacienteNuevo.InicializarObjetos();    
    this.mail = localStorage.getItem("SGHC-mail")!;
    if (this.mail !== null) {
      this._usuarioService.GetUsuario(this.mail).subscribe(
        (user) => {
          this._serviceError.Usuario = user;
          if(this._serviceError.Usuario.rol === "Admin")this._serviceError.Nav = this._serviceError.fillerNav;
          else this._serviceError.Nav = this._serviceError.fillerNav.filter((f:any) => !f.text.toUpperCase().includes('USUARIO'));
          this._serviceError.muestroMenu = true;
        },
        (error: HttpErrorResponse) => {
          this._serviceError.Error(error);
        }
      );
    }
  }
  

  FormValid() {
    return this._servicePacienteNuevo.FormValid();
  }

  GetAntecedente() {
    return this._servicePacienteNuevo.antecedente;
  }

  GuardarPaciente() {
    let formData = new FormData();
    formData.append("foto", this._servicePacienteNuevo.imagen);

    
    this.subscribes.push(this._servicePacienteNuevo.GuardarPaciente()
    .subscribe(
      (paciente) => {
        this._servicePacienteNuevo.InicializarObjetos();
        this.datosPersonales.form.reset();
        this.consultaInicial.form.reset();
        this.antecedentes.form.reset();
        this._snack.Mensaje("El paciente se guardó con éxito",'success');
        const espera = timer(1500);
        espera.subscribe(() => {
        this._router.navigate(['home/pacientes/listar-pacientes']);
      });
      },
      (error: HttpErrorResponse) => {        
        this._serviceError.Error(error);
      }
    ));
  }
}
