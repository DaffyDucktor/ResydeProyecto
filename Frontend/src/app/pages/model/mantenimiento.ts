import { Departamento } from "./departamento";
import { EstadoMantenimiento } from "./estadoMantenimiento";

export interface Mantenimiento {
    id:number,
    descripcion:string,
    fechaIni:string,
    fechaFin:string,
    fecCreacion:string,
    usuCreacion:string,
    fecModifica:string,
    usuModifica:string,
    idDepartamento:Departamento,
    idEstadoMantenimiento:EstadoMantenimiento,
}