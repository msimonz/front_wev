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
    // Verificar si el usuario está autenticado al cargar la página
    // Si no está autenticado, redirigir al login inmediatamente
    if (!this.authService.isAuthenticated()) {
      console.warn('Usuario no autenticado. Redirigiendo al login.');
      this.router.navigate(['/auth/login']);
      return; // Detener la ejecución de ngOnInit si no está autenticado
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
      // Asegurarse de que el ID es un número válido antes de intentar cargar los detalles
      if (!isNaN(id) && id > 0) {
         this.loadMascotaDetails(id);
      } else {
         console.error('ID de mascota inválido en la ruta:', params.get('id'));
         this.error = 'No se pudo cargar la información de la mascota: ID inválido.';
         // Opcional: redirigir si el ID es inválido
         // this.router.navigate(['/mascotas/tablaMascotas']);
      }
    });
  }

  loadMascotaDetails(id: number): void {
    this.mascotaService.findById(id).subscribe({
      next: (mascota) => {
        this.mascota = mascota;
        this.error = ''; // Limpiar error si la carga es exitosa
      },
      error: (error) => {
        console.error('Error al cargar mascota:', error);
        // No redirigir al login aquí, solo mostrar mensaje de error
        if (error.status === 403) {
          this.error = 'No tienes permisos para ver los detalles de esta mascota';
        } else {
          this.error = 'Error al cargar los detalles de la mascota. Por favor, inténtalo de nuevo más tarde.';
          // Podrías añadir lógica para otros errores si es necesario
        }
        // Eliminamos la redirección a tablaMascotas en caso de cualquier error.
        // La página de detalles se queda con el mensaje de error.
      }
    });
  }
}
