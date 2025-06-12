import { Recibo } from "./recibo";

export interface Pago {
  id: number;
  paidAmount: string;
  balance: string;
  mora: string;
  fecha: string;
  comments: string;
  fecCreacion: string;
  usuCreacion: string;
  fecModifica: string;
  usuModifica: string;
  idRecibo: Recibo;
}
