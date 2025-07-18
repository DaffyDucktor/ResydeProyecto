import { Injectable } from '@angular/core';
import { Departamento } from '../model/departamento';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:8080/resyde/departamento';

  constructor(private http: HttpClient) {}

  getCount(): Observable<Number> {
    return this.http.get<Number>(this.apiUrl + "/count");
  }

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  getDepartamentosByResidence(idResidencia: number): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/listAllByResidencia/${idResidencia}`);
  }

  getDepartamentoById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`);
  }

  createAllDepartamentos(idResidencia: number): Observable<any> {
    const formData = new FormData();

    formData.append('idResidencia', idResidencia.toString());

    return this.http.post(this.apiUrl + "/insertAll", formData);
  }

  createDepartamento(dep: Departamento): Observable<Departamento> {
    const formData = new FormData();

    formData.append('departamento', new Blob([JSON.stringify(dep)], { type: 'application/json'}));

    return this.http.post<Departamento>(this.apiUrl, formData);
  }

  updateDepartamento(dep: Departamento) {
    return this.http.put(this.apiUrl, dep);
  }

  deleteDepartamento(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
