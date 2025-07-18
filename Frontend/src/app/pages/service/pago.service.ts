import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../model/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:8080/resyde/pago';

  constructor(private http: HttpClient) { }

  getCount(): Observable<Number> {
    return this.http.get<Number>(this.apiUrl + "/count");
  }
  getBalance(): Observable<Number> {
    return this.http.get<Number>(this.apiUrl + "/balance");
  } 
  getPagosByResidence(idResidencia: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/listAllByResidencia/${idResidencia}`);
  }
  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  getPagoById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  createPago(pag: Pago): Observable<Pago> {
    const formData = new FormData();

    formData.append('pago', new Blob([JSON.stringify(pag)], { type: 'application/json' }));

    return this.http.post<Pago>(this.apiUrl, formData);
  }

  updatePago(dep: Pago) {
    return this.http.put(this.apiUrl, dep);
  }

  deletePago(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
