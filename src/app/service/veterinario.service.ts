import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veterinario } from '../model/veterinario';
import { Observable } from 'rxjs/internal/Observable';
import { Tratamiento } from '../model/tratamiento';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private apiUrl = "http://localhost:8080/veterinario";
  private veterinarioLogueado = new BehaviorSubject<Veterinario | null>(null);
  veterinarioLogueado$ = this.veterinarioLogueado.asObservable();
  private readonly VETERINARIO_KEY = 'veterinario_logueado';

  constructor(private http: HttpClient) {
    // Intentar recuperar el veterinario del localStorage al iniciar el servicio
    const veterinarioGuardado = localStorage.getItem(this.VETERINARIO_KEY);
    if (veterinarioGuardado) {
      this.veterinarioLogueado.next(JSON.parse(veterinarioGuardado));
    }
  }

  findById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/find/${id}`);
  }

  getTratamientos(id: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/tratamientos/${id}`);
  }

  authenticate(usuario: string, contrasena: string): Observable<Veterinario> {
    const loginData = { usuario, contrasena };
    return this.http.post<Veterinario>(`${this.apiUrl}/login`, loginData).pipe(
      tap(veterinario => {
        this.setVeterinarioLogueado(veterinario);
      })
    );
  }

  setVeterinarioLogueado(veterinario: Veterinario | null) {
    if (veterinario) {
      localStorage.setItem(this.VETERINARIO_KEY, JSON.stringify(veterinario));
    } else {
      localStorage.removeItem(this.VETERINARIO_KEY);
    }
    this.veterinarioLogueado.next(veterinario);
  }

  getVeterinarioLogueado(): Veterinario | null {
    return this.veterinarioLogueado.value;
  }

  isVeterinarioLogueado(): boolean {
    return this.veterinarioLogueado.value !== null;
  }

  logout(): void {
    this.setVeterinarioLogueado(null);
  }
}
