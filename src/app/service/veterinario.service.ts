import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veterinario } from '../model/veterinario';
import { Observable } from 'rxjs';
import { Tratamiento } from '../model/tratamiento';
import { Medicamento } from '../model/medicamento';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private apiUrl = "http://localhost:8080";
  private veterinarioLogueado = new BehaviorSubject<Veterinario | null>(null);
  veterinarioLogueado$ = this.veterinarioLogueado.asObservable();
  private readonly VETERINARIO_KEY = 'veterinario_logueado';

  constructor(private http: HttpClient) {
    const veterinarioGuardado = localStorage.getItem(this.VETERINARIO_KEY);
    if (veterinarioGuardado) {
      this.veterinarioLogueado.next(JSON.parse(veterinarioGuardado));
    }
  }

  // Métodos de autenticación y sesión
  findById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/veterinario/find/${id}`);
  }

  authenticate(usuario: string, contrasena: string): Observable<Veterinario> {
    const loginData = { usuario, contrasena };
    return this.http.post<Veterinario>(`${this.apiUrl}/veterinario/login`, loginData).pipe(
      tap(veterinario => {
        this.setVeterinarioLogueado(veterinario);
      })
    );
  }

  // Métodos para medicamentos
  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.apiUrl}/api/medicamentos`);
  }

  getMedicamentoById(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.apiUrl}/api/medicamentos/${id}`);
  }

  // Métodos para tratamientos
  getTratamientosByVeterinario(id: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/api/tratamientos/veterinario/${id}`);
  }

  getTratamientosByMascota(id: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/api/tratamientos/mascota/${id}`);
  }

  createTratamiento(tratamientoRequest: {
    mascotaId: number,
    veterinarioId: number,
    medicamentoId: number
  }): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(`${this.apiUrl}/api/tratamientos`, tratamientoRequest);
  }

  // Métodos de gestión de sesión
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

  getAllVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/veterinario`);
  }

  createVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.apiUrl}/veterinario`, veterinario);
  }

  updateVeterinario(id: number, veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.apiUrl}/veterinario/${id}`, veterinario);
  }

  deleteVeterinario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/veterinario/${id}`);
  }
}