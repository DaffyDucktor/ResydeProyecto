import { Departamento } from "./departamento";
import { EstadoPaquete } from "./estadoPaquete";

export interface Paquete {
  id: number;
  remitente: string;
  descripcion: string;
  fecha: string;
  hora: string;
  codigo: string;
  fecCreacion: string;
  usuCreacion: string;
  fecModifica: string;
  usuModifica: string;
  idDepartamento: Departamento;
  idEstadoPaquete: EstadoPaquete;
}
