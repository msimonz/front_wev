import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
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
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.currentUserSubject = new BehaviorSubject<any | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    if (token) {
      // Esto podría requerir una lógica asíncrona aquí o un servicio de inicialización de la app
      // Por ahora, asumimos que después del login la info estará disponible o se cargará
      // this.loadAuthenticatedUser(); // <-- Ejemplo de una función que podrías añadir
    }
  }

  public get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }

  public setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
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
          }
        })
      );
  }

  getUserDetails(tipo: UserType): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => observer.error('No hay token disponible'));
    }

    let url = '';
    if (tipo === 'ADMIN') url = `http://localhost:8080/admin/me`;
    else if (tipo === 'VETERINARIO') url = `http://localhost:8080/veterinario/me`;
    else url = `http://localhost:8080/clientes/me`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(url, { headers }).pipe(
      tap(user => {
          this.currentUserSubject.next(user);
      })
    );
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

  // Método opcional para cargar el usuario autenticado al inicio de la app si hay token
  // loadAuthenticatedUser(): void {
  //   const token = this.getToken();
  //   if (token) {
  //     // Necesitas saber el tipo de usuario para llamar a getUserDetails
  //     // Esto complica la carga inicial. Podrías guardar el tipo de usuario en localStorage también.
  //     // O tener un endpoint /me genérico que devuelva el tipo y los datos.
  //     // Por ahora, confiaremos en que el login o la primera petición protegida poblarán currentUserValue.
  //   }
  // }
} 