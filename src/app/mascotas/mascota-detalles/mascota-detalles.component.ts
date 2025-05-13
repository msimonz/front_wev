import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../../service/mascota.service';

@Component({
  selector: 'app-mascota-detalles',
  templateUrl: './mascota-detalles.component.html',
  styleUrls: ['./mascota-detalles.component.css']
})
export class MascotaDetallesComponent implements OnInit {
  mascota!: Mascota;
  mostrarVolverLista = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotaService: MascotaService
  ) {}

  ngOnInit() {
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
      },
      error: (error) => {
        console.error('Error al cargar mascota:', error);
        alert('Error al cargar los detalles de la mascota');
        this.router.navigate(['/mascota/tablaMascotas']);
      }
    });
  }
}
