import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/resyde/usuario';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
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

  login(user: any): Observable<any> {
    return this.http.post(this.apiUrl + "/login", user);
  }

  setToken(token: string) {
    this.cookieService.set("token", token);
  }
  getToken() {
    return this.cookieService.get("token");
  }

  getUserLogged() {
    const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token
  }
}
