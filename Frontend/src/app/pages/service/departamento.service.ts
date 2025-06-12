import { Injectable } from '@angular/core';
import { Departamento } from '../model/departamento';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:8080/departamento';

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  getDepartamentoById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`);
  }

  createDepartamento(dep: Departamento) {
    return this.http.post(this.apiUrl, dep);
  }

  updateDepartamento(dep: Departamento) {
    return this.http.put(this.apiUrl, dep);
  }

  deleteDepartamento(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
