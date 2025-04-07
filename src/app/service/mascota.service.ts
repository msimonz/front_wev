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

  addMascota(mascota: Omit<Mascota, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, mascota);
  }

  updateMascota(mascota: Mascota): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, mascota);
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
