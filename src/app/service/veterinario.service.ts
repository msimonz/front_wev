import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veterinario } from '../model/veterinario';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private apiUrl = "http://localhost:8080/veterinario";
  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/find/${id}`);
  }

  authenticate(usuario: string, contrasena: string): Observable<Veterinario> {
    const loginData = { usuario, contrasena };
    return this.http.post<Veterinario>(`${this.apiUrl}/login`, loginData);
  }
}
