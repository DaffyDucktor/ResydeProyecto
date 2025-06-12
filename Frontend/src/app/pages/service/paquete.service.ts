import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paquete } from '../model/paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  private apiUrl = 'http://localhost:8080/paquete';

  constructor(private http: HttpClient) { }

    getPaquetes(): Observable<Paquete[]> {
      return this.http.get<Paquete[]>(this.apiUrl);
    }
  
    getPaqueteById(id: number): Observable<Paquete> {
      return this.http.get<Paquete>(`${this.apiUrl}/${id}`);
    }
  
    createPaquete(dep: Paquete) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updatePaquete(dep: Paquete) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deletePaquete(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
