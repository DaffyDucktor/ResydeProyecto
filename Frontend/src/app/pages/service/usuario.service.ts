import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

    getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl);
    }
  
    getUsuarioById(id: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }
  
    createUsuario(dep: Usuario) {
      return this.http.post(this.apiUrl, dep);
    }
  
    updateUsuario(dep: Usuario) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteUsuario(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
}
