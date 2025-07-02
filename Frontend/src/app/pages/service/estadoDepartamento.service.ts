import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoDepartamento } from '../model/estadoDepartamento';

@Injectable({
  providedIn: 'root'
})
export class EstadoDepartamentoService {
  private apiUrl = 'http://localhost:8080/resyde/estadoDepartamento';

  constructor(private http: HttpClient) { }

    getEstadoDepartamentos(): Observable<EstadoDepartamento[]> {
      return this.http.get<EstadoDepartamento[]>(this.apiUrl);
    }
  
    getEstadoDepartamentoById(id: number): Observable<EstadoDepartamento> {
      return this.http.get<EstadoDepartamento>(`${this.apiUrl}/${id}`);
    }
  
    createEstadoDepartamento(dep: EstadoDepartamento) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateEstadoDepartamento(dep: EstadoDepartamento) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteEstadoDepartamento(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
}
