import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export type UserType = 'ADMIN' | 'VETERINARIO' | 'CLIENTE';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any | null>;
  public currentUser: Observable<any | null>;
  private readonly TOKEN_KEY = 'jwt_token';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }

  login(usuario: string, contrasena: string, tipo: UserType): Observable<any> {
    let url = '';
    if (tipo === 'ADMIN') url = `http://localhost:8080/admin/login`;
    else if (tipo === 'VETERINARIO') url = `http://localhost:8080/veterinario/login`;
    else url = `http://localhost:8080/clientes/login`;

    return this.http.post(url, { usuario, contrasena }, { responseType: 'text' })
      .pipe(
        tap(token => {
          if (token) {
            localStorage.setItem(this.TOKEN_KEY, token);
            // Aquí podrías hacer una petición para obtener los datos del usuario usando el token
            this.currentUserSubject.next({ token });
          }
        })
      );
  }

  getUserDetails(tipo: UserType): Observable<any> {
    const token = this.getToken();
    let url = '';
    if (tipo === 'ADMIN') url = `http://localhost:8080/admin/me`;
    else if (tipo === 'VETERINARIO') url = `http://localhost:8080/veterinario/me`;
    else url = `http://localhost:8080/clientes/me`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(url, { headers });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Puedes agregar aquí un método para obtener los datos del usuario usando el token
} 