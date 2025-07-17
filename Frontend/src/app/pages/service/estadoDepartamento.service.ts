import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoDepartamento } from '../model/estadoDepartamento';

@Injectable({
  providedIn: 'root'
})
export class EstadoDepartamentoService {
  private apiUrl = 'https://resydeproyecto.onrender.com/resyde/estadoDepartamento';

  constructor(private http: HttpClient) { }

    getEstadoDepartamentos(): Observable<EstadoDepartamento[]> {
      return this.http.get<EstadoDepartamento[]>(this.apiUrl);
    }
  
    getEstadoDepartamentoById(id: number): Observable<EstadoDepartamento> {
      return this.http.get<EstadoDepartamento>(`${this.apiUrl}/${id}`);
    }
}
