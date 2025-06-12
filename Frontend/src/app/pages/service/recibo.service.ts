import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recibo } from '../model/recibo';

@Injectable({
  providedIn: 'root',
})
export class ReciboService {
  private apiUrl = 'http://localhost:8080/recibo';

  constructor(private http: HttpClient) {}

  getRecibos(): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(this.apiUrl);
  }

  getReciboById(id: number): Observable<Recibo> {
    return this.http.get<Recibo>(`${this.apiUrl}/${id}`);
  }

  createRecibo(rec: Recibo) {
    return this.http.post(this.apiUrl, rec);
  }

  updateRecibo(rec: Recibo) {
    return this.http.put(this.apiUrl, rec);
  }

  deleteRecibo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
