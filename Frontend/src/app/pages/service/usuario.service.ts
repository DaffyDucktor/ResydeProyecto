import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://resydeproyecto.onrender.com/resyde/usuario';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuariosByResidence(idResidencia: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/listAllByResidencia/${idResidencia}`);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    const formData = new FormData();

    formData.append('residencia', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));

    return this.http.post<Usuario>(this.apiUrl, formData);
  }

  updateUsuario(dep: Usuario) {
    return this.http.put(this.apiUrl, dep);
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  login(user: any): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl + "/login", user);
  }

  setTokens(object: Usuario) {
    this.cookieService.set("usuario", object.usuario);
    this.cookieService.set("contra", object.password);
    this.cookieService.set("idRol", object.idRol.id.toString());
    this.cookieService.set("idResidencia", object.idResidencia.id.toString())
  }
}

