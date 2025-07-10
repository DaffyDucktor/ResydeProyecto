import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoPaquete } from '../model/estadoPaquete';

@Injectable({
  providedIn: 'root'
})
export class EstadoPaqueteService {
  private apiUrl = 'http://localhost:8080/resyde/estadoPaquete';

  constructor(private http: HttpClient) { }

    getEstadoPaquetes(): Observable<EstadoPaquete[]> {
      return this.http.get<EstadoPaquete[]>(this.apiUrl);
    }
  
    getEstadoPaqueteById(id: number): Observable<EstadoPaquete> {
      return this.http.get<EstadoPaquete>(`${this.apiUrl}/${id}`);
    }
  
    createEstadoPaquete(dep: EstadoPaquete) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateEstadoPaquete(dep: EstadoPaquete) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteEstadoPaquete(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
}
