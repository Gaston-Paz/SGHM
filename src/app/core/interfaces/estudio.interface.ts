import { Paciente } from "./datos-personales.interface";

export interface Estudios{
    idEstudio:number;
    paciente:Paciente;
    ruta:string;
    nombreArchivo:string;
}