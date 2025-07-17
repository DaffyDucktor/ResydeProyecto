import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visita } from '../model/visita';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  private apiUrl = 'https://resydeproyecto.onrender.com/resyde/visita';

  constructor(private http: HttpClient) { }

  getVisitas(): Observable<Visita[]> {
    return this.http.get<Visita[]>(this.apiUrl);
  }

  getVisitasByResidence(idResidencia: number): Observable<Visita[]> {
      return this.http.get<Visita[]>(`${this.apiUrl}/listAllByResidencia/${idResidencia}`);
  }
  getVisitaById(id: number): Observable<Visita> {
    return this.http.get<Visita>(`${this.apiUrl}/${id}`);
  }

  createVisita(visita: Visita): Observable<Visita> {
    const formData = new FormData();

    formData.append('visita', new Blob([JSON.stringify(visita)], { type: 'application/json' }));

    return this.http.post<Visita>(this.apiUrl, formData);
  }

  updateVisita(dep: Visita) {
    return this.http.put(this.apiUrl, dep);
  }

  deleteVisita(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
