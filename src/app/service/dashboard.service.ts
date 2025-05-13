import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/admin/estadisticas'; // Ruta del backend

  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getTratamientosUltimoMes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tratamientos-ultimo-mes`);
  }

  getTratamientosPorTipo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tratamientos-por-tipo`);
  }

  getEstadoVeterinarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estado-veterinarios`);
  }

  getEstadoMascotas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estado-mascotas`);
  }

  getVentasYGanancias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ventas-ganancias`);
  }

  getTop3Tratamientos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top3-tratamientos`);
  }
}
