import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Mascota } from 'src/app/model/mascota';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-cliente-detalles',
  templateUrl: './cliente-detalles.component.html',
  styleUrls: ['./cliente-detalles.component.css']
})
export class ClienteDetallesComponent implements OnInit {
  cliente!: Cliente;
  mascotas: Mascota[] = [];
  errorMascotas: string = '';
  esAdministrador = false;
  mostrarVolverLista = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private mascotaService: MascotaService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    const rutaOrigen = this.route.snapshot.queryParams['rutaOrigen'];
    if (rutaOrigen === 'tabla-clientes') {
      this.mostrarVolverLista = true;
    }
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadClienteDetails(id);
    });
  }

  loadClienteDetails(id: number): void {
    this.clienteService.findById(id).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.loadMascotasCliente(id);
      },
      error: (error) => {
        console.error('Error al cargar cliente:', error);
        alert('Error al cargar los detalles del cliente');
        this.router.navigate(['/cliente/tablaClientes']);
      }
    });
  }

  loadMascotasCliente(clienteId: number): void {
    this.mascotaService.getMascotasByClienteId(clienteId).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
      },
      error: (error) => {
        console.error('Error al cargar mascotas:', error);
        this.errorMascotas = 'Error al cargar las mascotas del cliente';
      }
    });
  }
}