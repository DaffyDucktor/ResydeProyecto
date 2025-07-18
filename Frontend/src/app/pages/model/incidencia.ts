import { Residencia } from "./residencia";

export interface Incidencia {
    id:number,
    detalle:string,
    visible:string,
    fecha:string,
    hora:string,
    fecCreacion:string,
    usuCreacion:string,
    fecModifica:string,
    usuModifica:string,
    idResidencia:Residencia,
}