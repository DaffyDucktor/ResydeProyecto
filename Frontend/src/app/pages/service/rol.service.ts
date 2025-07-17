import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = 'https://resydeproyecto.onrender.com/resyde/rol';

  constructor(private http: HttpClient) { }

    getRols(): Observable<Rol[]> {
      return this.http.get<Rol[]>(this.apiUrl);
    }
  
    getRolById(id: number): Observable<Rol> {
      return this.http.get<Rol>(`${this.apiUrl}/${id}`);
    }
}
