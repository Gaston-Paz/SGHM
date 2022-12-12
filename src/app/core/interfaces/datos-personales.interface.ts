export interface Paciente{
    idPaciente?:number;
    nombre: string,
    apellido: string,
    celular: string,
    email: string,
    fechaNacimiento: Date,
    localidad: string,
    nacio: string,
    ocupacion: string,
    fotoPerfil: string,
    extensionFoto?: string,

    
}