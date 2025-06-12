import { Residencia } from './residencia';
import { Residente } from './residente';
import { Rol } from './rol';

export interface Usuario {
  id: number;
  user: string;
  password: string;
  fecCreacion: string;
  usuCreacion: string;
  fecModifica: string;
  usuModifica: string;
  idResidencia: Residencia;
  idResidente: Residente;
  idRol: Rol;
}
