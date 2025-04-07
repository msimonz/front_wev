import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = "http://localhost:8080/clientes";
  
  constructor(private http: HttpClient) {}

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/all`);
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/find/${id}`);
  }

  addCliente(cliente: Omit<Cliente, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, cliente);
  }
}
