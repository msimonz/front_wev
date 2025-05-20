import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../../service/mascota.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mascota-detalles',
  templateUrl: './mascota-detalles.component.html',
  styleUrls: ['./mascota-detalles.component.css']
})
export class MascotaDetallesComponent implements OnInit {
  mascota!: Mascota;
  mostrarVolverLista = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotaService: MascotaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // Verificar si viene del login
    const clienteGuardado = localStorage.getItem('cliente');
    if (clienteGuardado) {
      const cliente = JSON.parse(clienteGuardado);
      // Si hay un cliente guardado, no mostrar el botón de volver
      this.mostrarVolverLista = false;
    } else {
      // Si no hay cliente guardado, viene de la tabla
      this.mostrarVolverLista = true;
    }

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadMascotaDetails(id);
    });
  }

  loadMascotaDetails(id: number): void {
    this.mascotaService.findById(id).subscribe({
      next: (mascota) => {
        this.mascota = mascota;
        this.error = '';
      },
      error: (error) => {
        console.error('Error al cargar mascota:', error);
        if (error.status === 403) {
          this.error = 'No tienes permisos para ver los detalles de esta mascota';
        } else {
          this.error = 'Error al cargar los detalles de la mascota';
        }
        // Solo redirigir si no es un error de autorización
        if (error.status !== 403) {
          this.router.navigate(['/mascota/tablaMascotas']);
        }
      }
    });
  }
}
