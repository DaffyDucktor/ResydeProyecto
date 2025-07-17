import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Residencia } from '../model/residencia';

@Injectable({
  providedIn: 'root',
})
export class ResidenciaService {
  private apiUrl = 'https://resydeproyecto.onrender.com/resyde/residencia';

  constructor(private http: HttpClient) {}

  getCount(): Observable<Number> {
    return this.http.get<Number>(this.apiUrl + "/count");
  }

  getResidencias(): Observable<Residencia[]> {
    return this.http.get<Residencia[]>(this.apiUrl);
  }

  getResidenciaById(id: number): Observable<Residencia> {
    return this.http.get<Residencia>(`${this.apiUrl}/${id}`);
  }

  createResidencia(res: Residencia): Observable<Residencia>{
    const formData = new FormData();

    formData.append('residencia', new Blob([JSON.stringify(res)], { type: 'application/json'}));

    return this.http.post<Residencia>(this.apiUrl, formData);
  }

  updateResidencia(res: Residencia) {
    return this.http.put(this.apiUrl, res);
  }

  deleteResidencia(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
