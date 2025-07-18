import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Residente } from '../model/residente';

@Injectable({
  providedIn: 'root'
})
export class ResidenteService {
  private apiUrl = 'http://localhost:8080/resyde/residente';

  constructor(private http: HttpClient) { }

  getCount(): Observable<Number> {
    return this.http.get<Number>(this.apiUrl + "/count");
  }
  getResidentes(): Observable<Residente[]> {
    return this.http.get<Residente[]>(this.apiUrl);
  }

  getResidentesByResidence(idResidencia: number): Observable<Residente[]> {
    return this.http.get<Residente[]>(`${this.apiUrl}/listAllByResidencia/${idResidencia}`);
  }

  getResidenteById(id: number): Observable<Residente> {
    return this.http.get<Residente>(`${this.apiUrl}/${id}`);
  }

  createResidente(residente: Residente): Observable<Residente> {
    const formData = new FormData();

    formData.append('residente', new Blob([JSON.stringify(residente)], { type: 'application/json' }));

    return this.http.post<Residente>(this.apiUrl, formData);
  }

  updateResidente(dep: Residente) {
    return this.http.put(this.apiUrl, dep);
  }

  deleteResidente(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
