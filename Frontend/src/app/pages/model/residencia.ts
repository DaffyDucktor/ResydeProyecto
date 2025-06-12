import { TipoResidencia } from "./tipoResidencia";

export interface Residencia {
    id:number,
    nombre:string,
    direccion:string,
    nDep:string,
    nEdificio:string,
    fecCreacion:string,
    usuCreacion:string,
    fecModifica:string,
    usuModifica:string,
    idTipoResidencia:TipoResidencia
}