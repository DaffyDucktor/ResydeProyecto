import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoRecibo } from '../model/estadoRecibo';

@Injectable({
  providedIn: 'root'
})
export class EstadoReciboService {
  private apiUrl = 'http://localhost:8080/resyde/EstadoRecibo';

  constructor(private http: HttpClient) { }

    getEstadoRecibo(): Observable<EstadoRecibo[]> {
      return this.http.get<EstadoRecibo[]>(this.apiUrl);
    }
  
    getEstadoReciboById(id: number): Observable<EstadoRecibo> {
      return this.http.get<EstadoRecibo>(`${this.apiUrl}/${id}`);
    }
  
    createEstadoRecibo(dep: EstadoRecibo) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateEstadoRecibo(dep: EstadoRecibo) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteEstadoRecibo(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
}
