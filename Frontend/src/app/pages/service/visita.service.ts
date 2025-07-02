import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visita } from '../model/visita';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  private apiUrl = 'http://localhost:8080/resyde/visita';

  constructor(private http: HttpClient) { }

  getVisitas(): Observable<Visita[]> {
    return this.http.get<Visita[]>(this.apiUrl);
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
