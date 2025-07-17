import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoResidencia } from '../model/tipoResidencia';

@Injectable({
  providedIn: 'root'
})
export class TipoResidenciaService {
  private apiUrl = 'https://resydeproyecto.onrender.com/resyde/tipoResidencia';

  constructor(private http: HttpClient) { }

    getTipoResidencia(): Observable<TipoResidencia[]> {
      return this.http.get<TipoResidencia[]>(this.apiUrl);
    }
  
    getTipoResidenciaById(id: number): Observable<TipoResidencia> {
      return this.http.get<TipoResidencia>(`${this.apiUrl}/${id}`);
    }
  
    createTipoResidencia(dep: TipoResidencia) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateTipoResidencia(dep: TipoResidencia) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteTipoResidencia(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
}
