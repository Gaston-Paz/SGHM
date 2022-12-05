export interface Paciente{
    id?:number;
    nombre: string,
    apellido: string,
    celular: string,
    email: string,
    fechaNacimiento: Date,
    localidad: string,
    nacio: string,
    ocupacion: string,
    fotoPerfil?: Blob
    
}