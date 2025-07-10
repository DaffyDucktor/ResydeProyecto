import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoMantenimiento } from '../model/estadoMantenimiento';

@Injectable({
  providedIn: 'root'
})
export class EstadoMantenimientoService {
  private apiUrl = 'http://localhost:8080/resyde/estadoMantenimiento';

  constructor(private http: HttpClient) { }

    getEstadoMantenimientos(): Observable<EstadoMantenimiento[]> {
      return this.http.get<EstadoMantenimiento[]>(this.apiUrl);
    }
  
    getEstadoMantenimientoById(id: number): Observable<EstadoMantenimiento> {
      return this.http.get<EstadoMantenimiento>(`${this.apiUrl}/${id}`);
    }
  
    createEstadoMantenimiento(dep: EstadoMantenimiento) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateEstadoMantenimiento(dep: EstadoMantenimiento) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteEstadoMantenimiento(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
}
