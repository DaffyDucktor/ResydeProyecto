import { EstadoMantenimiento } from "./estadoMantenimiento";
import { Residencia } from "./residencia";

export interface Mantenimiento {
    id:number,
    descripcion:string,
    fechaIni:string,
    fechaFin:string,
    fecCreacion:string,
    usuCreacion:string,
    fecModifica:string,
    usuModifica:string,
    idResidencia:Residencia,
    idEstadoMantenimiento:EstadoMantenimiento,
}