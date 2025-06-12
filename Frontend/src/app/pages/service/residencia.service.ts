import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Residencia } from '../model/residencia';

@Injectable({
  providedIn: 'root',
})
export class ResidenciaService {
  private apiUrl = 'http://localhost:8080/residencia';

  constructor(private http: HttpClient) {}

  getResidencias(): Observable<Residencia[]> {
    return this.http.get<Residencia[]>(this.apiUrl);
  }

  getResidenciaById(id: number): Observable<Residencia> {
    return this.http.get<Residencia>(`${this.apiUrl}/${id}`);
  }

  createResidencia(res: Residencia) {
    return this.http.post(this.apiUrl, res);
  }

  updateResidencia(res: Residencia) {
    return this.http.put(this.apiUrl, res);
  }

  deleteResidencia(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
