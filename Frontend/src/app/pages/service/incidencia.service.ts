import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidencia } from '../model/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private apiUrl = 'http://localhost:8080/incidencia';

  constructor(private http: HttpClient) { }

    getIncidencias(): Observable<Incidencia[]> {
      return this.http.get<Incidencia[]>(this.apiUrl);
    }
  
    getIncidenciaById(id: number): Observable<Incidencia> {
      return this.http.get<Incidencia>(`${this.apiUrl}/${id}`);
    }
  
    createIncidencia(dep: Incidencia) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateIncidencia(dep: Incidencia) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteIncidencia(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
}
