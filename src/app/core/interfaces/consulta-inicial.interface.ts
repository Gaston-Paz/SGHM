export interface ConsultaInicial{
    idConsulta?: number;
    idPaciente?:number;
    fecha: Date;
    motivo: string;
    antiguedad: string;
    localizacion: string;
    intensidad: string;
    caracteristica: string;
    irradiacion: string;
    atenua: string;
    actividadFisica: string;
    covid: boolean;
    
}