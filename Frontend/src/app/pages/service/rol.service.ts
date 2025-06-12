import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = 'http://localhost:8080/rol';

  constructor(private http: HttpClient) { }

    getRols(): Observable<Rol[]> {
      return this.http.get<Rol[]>(this.apiUrl);
    }
  
    getRolById(id: number): Observable<Rol> {
      return this.http.get<Rol>(`${this.apiUrl}/${id}`);
    }
  
    createRol(dep: Rol) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateRol(dep: Rol) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteRol(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
