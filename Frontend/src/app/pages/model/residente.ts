import { Departamento } from "./departamento";

export interface Residente {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  fecCreacion: string;
  usuCreacion: string;
  fecModifica: string;
  usuModifica: string;
  idDepartamento: Departamento;
}
