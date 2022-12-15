import { Antecedente } from "./antecedentes.interface";
import { ConsultaInicial } from "./consulta-inicial.interface";
import { Paciente } from "./datos-personales.interface";

export interface AltaPaciente{
    paciente:Paciente;
    consultaInicial:ConsultaInicial;
    antecedente: Antecedente;
}