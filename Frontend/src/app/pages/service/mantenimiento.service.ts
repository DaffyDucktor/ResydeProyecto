import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mantenimiento } from '../model/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private apiUrl = 'http://localhost:8080/mantenimiento';

  constructor(private http: HttpClient) { }

  getMantenimientos(): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(this.apiUrl);
  }

  getMantenimientoById(id: number): Observable<Mantenimiento> {
    return this.http.get<Mantenimiento>(`${this.apiUrl}/${id}`);
  }

  createMantenimiento(dep: Mantenimiento) {
    return this.http.post(this.apiUrl, dep);
  }

  updateMantenimiento(dep: Mantenimiento) {
    return this.http.put(this.apiUrl, dep);
  }

  deleteMantenimiento(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
