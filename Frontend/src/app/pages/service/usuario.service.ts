import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/resyde/usuario';

  constructor(private http: HttpClient) { }

    getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl);
    }
  
    getUsuarioById(id: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }
  
    createUsuario(usuario: Usuario): Observable<Usuario> {
          const formData = new FormData();

    formData.append('residencia', new Blob([JSON.stringify(usuario)], { type: 'application/json'}));

    return this.http.post<Usuario>(this.apiUrl, formData);
    }
  
    updateUsuario(dep: Usuario) {
      return this.http.put(this.apiUrl, dep);
    }
  
    deleteUsuario(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
}
