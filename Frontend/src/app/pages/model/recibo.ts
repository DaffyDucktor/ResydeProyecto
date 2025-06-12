import { Departamento } from "./departamento";
import { EstadoRecibo } from "./estadoRecibo";

export interface Recibo {
    id:number,
    year:string,
    month:string,
    particulars:string,
    total:string,
    comments:string,
    fecCreacion:string,
    usuCreacion:string,
    fecModifica:string,
    usuModifica:string,
    idDepartamento:Departamento,
    idEstadoRecibo:EstadoRecibo
}