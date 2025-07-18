import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mantenimiento } from '../model/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private apiUrl = 'http://localhost:8080/resyde/mantenimiento';

  constructor(private http: HttpClient) { }

  getMantenimientos(): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(this.apiUrl);
  }

  getMantenimientosByResidence(idResidencia: number): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(`${this.apiUrl}/listAllByResidencia/${idResidencia}`);
  }

  getMantenimientoById(id: number): Observable<Mantenimiento> {
    return this.http.get<Mantenimiento>(`${this.apiUrl}/${id}`);
  }

  createMantenimiento(mant: Mantenimiento): Observable<Mantenimiento> {
    const formData = new FormData();

    formData.append('mantenimiento', new Blob([JSON.stringify(mant)], { type: 'application/json' }));

    return this.http.post<Mantenimiento>(this.apiUrl, formData);
  }

  updateMantenimiento(dep: Mantenimiento) {
    return this.http.put(this.apiUrl, dep);
  }

  deleteMantenimiento(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
