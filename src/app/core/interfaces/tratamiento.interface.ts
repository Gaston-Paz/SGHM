import { Paciente } from "./datos-personales.interface";

export interface Tratamiento{
    idTratamiento?:number;
    idPaciente:number;
    fecha:Date;
    motivo:string;
    trianguloDeTalla?:string;
    alturaDeIliacos?:string;
    barral?:string;
    esferas?:string;
    especifico:string;
    sedestacion:string;
    sugerencias:string;
    proximoTurnoIndicado:Date;
    paciente?: Paciente;
}