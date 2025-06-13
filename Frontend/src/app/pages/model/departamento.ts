import { EstadoDepartamento } from "./estadoDepartamento";
import { Residencia } from "./residencia";

export interface Departamento {
    id:number,
    codigo:string,
    fecCreacion:string,
    usuCreacion:string,
    fecModifica:string,
    usuModifica:string,
    idResidencia:Residencia,
    idEstadoDepartamento:EstadoDepartamento
}