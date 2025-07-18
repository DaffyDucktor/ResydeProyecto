import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paquete } from '../model/paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  private apiUrl = 'http://localhost:8080/resyde/paquete';

  constructor(private http: HttpClient) { }

  getPaquetes(): Observable<Paquete[]> {
    return this.http.get<Paquete[]>(this.apiUrl);
  }

  getPaquetesByResidence(idResidencia: number): Observable<Paquete[]> {
    return this.http.get<Paquete[]>(`${this.apiUrl}/listAllByResidencia/${idResidencia}`);
  }

  getPaqueteById(id: number): Observable<Paquete> {
    return this.http.get<Paquete>(`${this.apiUrl}/${id}`);
  }

  createPaquete(paq: Paquete): Observable<Paquete> {
    const formData = new FormData();

    formData.append('paquete', new Blob([JSON.stringify(paq)], { type: 'application/json' }));

    return this.http.post<Paquete>(this.apiUrl, formData);
  }

  updatePaquete(dep: Paquete) {
    return this.http.put(this.apiUrl, dep);
  }

  deletePaquete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
