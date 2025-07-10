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
  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  getPagoById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  createPago(dep: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, dep);
  }

  updatePago(dep: Pago) {
    return this.http.put(this.apiUrl, dep);
  }

  deletePago(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
