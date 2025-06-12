import { EstadoDepartamento } from "./estadoDepartamento";

export interface Departamento {
    id:number,
    codigo:string,
    fecCreacion:string,
    usuCreacion:string,
    fecModifica:string,
    usuModifica:string,
    idResidencia:string,
    idEstadoDepartamento:EstadoDepartamento
}