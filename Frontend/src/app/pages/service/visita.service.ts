import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visita } from '../model/visita';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  private apiUrl = 'http://localhost:8080/visita';

  constructor(private http: HttpClient) { }

    getVisitas(): Observable<Visita[]> {
      return this.http.get<Visita[]>(this.apiUrl);
    }
  
    getVisitaById(id: number): Observable<Visita> {
      return this.http.get<Visita>(`${this.apiUrl}/${id}`);
    }
  
    createVisita(dep: Visita) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateVisita(dep: Visita) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteVisita(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
}
