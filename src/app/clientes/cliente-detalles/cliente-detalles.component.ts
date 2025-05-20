import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Mascota } from 'src/app/model/mascota';
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
  mostrarVolverLista = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private mascotaService: MascotaService
  ) { }

  ngOnInit(): void {
    // Verificar si viene del login
    const clienteGuardado = localStorage.getItem('cliente');
    if (clienteGuardado) {
      const cliente = JSON.parse(clienteGuardado);
      // Si el ID del cliente guardado coincide con el ID de la ruta, viene del login
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        this.mostrarVolverLista = id !== cliente.id;
        this.loadClienteDetails(id);
      });
    } else {
      // Si no hay cliente guardado, viene de la tabla
      this.mostrarVolverLista = true;
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        this.loadClienteDetails(id);
      });
    }
  }

  loadClienteDetails(id: number): void {
    this.clienteService.findById(id).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        // Si el usuario autenticado es el cliente, usa getMisMascotas
        const clienteGuardado = localStorage.getItem('cliente');
        if (clienteGuardado) {
          const clienteAuth = JSON.parse(clienteGuardado);
          if (clienteAuth.id === id) {
            this.mascotaService.getMisMascotas().subscribe({
              next: (mascotas) => {
                this.mascotas = mascotas;
              },
              error: (error) => {
                console.error('Error al cargar mascotas:', error);
                this.errorMascotas = 'Error al cargar las mascotas del cliente';
              }
            });
            return;
          }
        }
        // Si no, usa el método por id
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