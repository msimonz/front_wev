import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Mascota } from 'src/app/model/mascota';
import { ClienteService } from 'src/app/service/cliente.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cliente-detalles',
  templateUrl: './cliente-detalles.component.html',
  styleUrls: ['./cliente-detalles.component.css']
})
export class ClienteDetallesComponent implements OnInit {
  cliente!: Cliente;
  mascotas: Mascota[] = [];
  errorMascotas: string = '';
  mostrarVolverLista = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private mascotaService: MascotaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const clienteLogueado = this.authService.currentUserValue;
    const idRuta = Number(this.route.snapshot.paramMap.get('id'));

    if (clienteLogueado && clienteLogueado.id && clienteLogueado.id === idRuta) {
        this.loadClienteDetails(clienteLogueado.id);
        this.loadMisMascotas();
        this.mostrarVolverLista = false;
    } else {
        console.log('Acceso a detalles de cliente. Usuario logueado:', clienteLogueado ? clienteLogueado.id : 'Ninguno', 'ID de ruta:', idRuta);

        if (clienteLogueado && clienteLogueado.id && clienteLogueado.id !== idRuta) {
             console.warn('Intento de acceder a detalle de otro cliente. Redirigiendo al propio detalle.');
             this.router.navigate(['/cliente/detallesCliente', clienteLogueado.id]);
             return;
        }

        if (idRuta) {
             console.log(`Intentando cargar detalles y mascotas para cliente con ID ${idRuta} (Posiblemente Admin/Vet).`);
             this.loadClienteDetails(idRuta);
             this.loadMascotasCliente(idRuta);
             this.mostrarVolverLista = true;
        } else {
            console.error('Acceso inválido a detalles de cliente: No hay ID en la ruta.');
            this.errorMascotas = 'No se pudo cargar la información del cliente: ID no proporcionado.';
             if (!clienteLogueado) {
                 this.router.navigate(['/auth/login']);
             } else {
                // Si hay alguien logueado pero sin ID en la ruta, algo va mal, podrías redirigir a un dashboard
                // this.router.navigate(['/dashboard']);
             }
        }
    }
  }

  loadClienteDetails(id: number): void {
    this.clienteService.findById(id).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.errorMascotas = '';
      },
      error: (error) => {
        console.error('Error al cargar cliente:', error);
        alert('Error al cargar los detalles del cliente');
        this.errorMascotas = 'Error al cargar los detalles del cliente';
      }
    });
  }

  loadMisMascotas(): void {
      this.mascotaService.getMisMascotas().subscribe({
          next: (mascotas) => {
              this.mascotas = mascotas;
              this.errorMascotas = '';
          },
          error: (error) => {
              console.error('Error al cargar mis mascotas:', error);
              if (error.status === 403) {
                   this.errorMascotas = 'No tienes permisos para ver estas mascotas.';
              } else {
                   this.errorMascotas = 'Error al cargar tus mascotas.';
              }
          }
      });
  }

  loadMascotasCliente(clienteId: number): void {
    this.mascotaService.getMascotasByClienteId(clienteId).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.errorMascotas = '';
      },
      error: (error) => {
        console.error('Error al cargar mascotas por cliente ID:', error);
         if (error.status === 403) {
             this.errorMascotas = 'No tienes permisos para ver las mascotas de este cliente.';
          } else {
             this.errorMascotas = 'Error al cargar las mascotas del cliente.';
          }
      }
    });
  }

  volverALista(): void {
     this.router.navigate(['/cliente/tablaClientes']);
  }
}