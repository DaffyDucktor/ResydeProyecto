import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recibo } from '../model/recibo';
import { Residencia } from '../model/residencia';

@Injectable({
  providedIn: 'root',
})
export class ReciboService {
  private apiUrl = 'http://localhost:8080/resyde/recibo';

  constructor(private http: HttpClient) { }

  getCount(): Observable<Number> {
    return this.http.get<Number>(this.apiUrl + "/count");
  }

  getBalance(): Observable<Number> {
    return this.http.get<Number>(this.apiUrl + "/balance");
  }
  getRecibos(): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(this.apiUrl);
  }
  getRecibosByResidence(idResidencia: number): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(`${this.apiUrl}/listAllByResidencia/${idResidencia}`);
  }

  getReciboById(id: number): Observable<Recibo> {
    return this.http.get<Recibo>(`${this.apiUrl}/${id}`);
  }

  createRecibo(rec: Recibo): Observable<Recibo> {
    const formData = new FormData();

    formData.append('recibo', new Blob([JSON.stringify(rec)], { type: 'application/json' }));

    return this.http.post<Recibo>(this.apiUrl, formData);
  }

  updateRecibo(rec: Recibo) {
    return this.http.put(this.apiUrl, rec);
  }

  deleteRecibo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
