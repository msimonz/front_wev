import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private apiUrl = "http://localhost:8080/mascotas";

  constructor(private http: HttpClient) {}

  findAll(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/all`);
  }

  findById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/find/${id}`);
  }

  addMascota(mascota: Omit<Mascota, 'id'>, cliente_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add?cliente_id=${cliente_id}`, mascota);
  }

  updateMascota(mascota: Mascota): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, mascota);
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getMascotasByClienteId(clienteId: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  asignarTratamiento(mascotaId: number, tratamientoId: number, veterinarioId: number): Observable<any> {
    const asignacion = {
      mascotaId,
      tratamientoId,
      veterinarioId
    };
    return this.http.post('http://localhost:8080/asignacion-tratamiento/asignar', asignacion);
  }

  getMisMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`http://localhost:8080/clientes/mis-mascotas`);
  }
}
