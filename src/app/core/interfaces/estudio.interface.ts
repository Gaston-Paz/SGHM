import { Paciente } from "./datos-personales.interface";

export interface Estudios{
    idEstudio:number;
    paciente:Paciente;
    estudio?: FormData,
    nombreArchivo:string;
    fecha:Date;
}