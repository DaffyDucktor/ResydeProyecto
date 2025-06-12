import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Residente } from '../model/residente';

@Injectable({
  providedIn: 'root'
})
export class ResidenteService {
  private apiUrl = 'http://localhost:8080/residente';

  constructor(private http: HttpClient) { }

    getResidentes(): Observable<Residente[]> {
      return this.http.get<Residente[]>(this.apiUrl);
    }
  
    getResidenteById(id: number): Observable<Residente> {
      return this.http.get<Residente>(`${this.apiUrl}/${id}`);
    }
  
    createResidente(dep: Residente) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateResidente(dep: Residente) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteResidente(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
