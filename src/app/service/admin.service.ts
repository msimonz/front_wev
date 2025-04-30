import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/admin/login'; // URL al backend

  constructor(private http: HttpClient) {}

  login(loginData: { usuario: string; contrasena: string }): Observable<any> {
    return this.http.post(this.apiUrl, loginData);
  }

  esAdmin(): boolean {
    return localStorage.getItem('esAdmin') === 'true';
  }
}
