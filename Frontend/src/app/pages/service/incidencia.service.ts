import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidencia } from '../model/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private apiUrl = 'http://localhost:8080/resyde/incidencia';

  constructor(private http: HttpClient) { }

  getIncidencias(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.apiUrl);
  }

  getIncidenciasByResidence(idResidencia: number): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(`${this.apiUrl}/listAllByResidencia/${idResidencia}`);
  }

  getIncidenciaById(id: number): Observable<Incidencia> {
    return this.http.get<Incidencia>(`${this.apiUrl}/${id}`);
  }

  createIncidencia(inc: Incidencia): Observable<Incidencia> {
    const formData = new FormData();

    formData.append('incidencia', new Blob([JSON.stringify(inc)], { type: 'application/json' }));

    return this.http.post<Incidencia>(this.apiUrl, formData);
  }

  updateIncidencia(dep: Incidencia) {
    return this.http.put(this.apiUrl, dep);
  }

  deleteIncidencia(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
