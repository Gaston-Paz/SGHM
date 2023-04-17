import { Paciente } from "./datos-personales.interface";

export interface Estudios{
    idEstudio:number;
    paciente:Paciente;
    estudio?: any,
    nombreArchivo:string;
    tipo:string;
    fecha:Date;
    pacienteId?:number;
}