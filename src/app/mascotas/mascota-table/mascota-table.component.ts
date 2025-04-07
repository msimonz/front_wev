import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css'],
})
export class MascotaTableComponent implements OnInit {
  mascotaSeleccionada!: Mascota;
  mascotaParaActualizar!: Mascota;
  mascotas: Mascota[] = [];

  @Output() mascotaEliminada = new EventEmitter<Mascota>();

  constructor(private mascotaService: MascotaService) {}

  ngOnInit() {
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.mascotaService.findAll().subscribe({
      next: (mascotas) => (this.mascotas = mascotas),
      error: (err) => console.error('Error al cargar mascotas:', err)
    });
  }

  eliminarMascota(mascota: Mascota) {
    if (confirm(`¿Está seguro de eliminar a ${mascota.nombre}?`)) {
      this.mascotaService.deleteMascota(mascota.id).subscribe({
        next: () => {
          this.mascotaEliminada.emit(mascota);
          this.cargarMascotas();
        },
        error: (err) => console.error('Error al eliminar mascota:', err)
      });
    }
  }

  actualizarMascota(mascota: Mascota) {
    this.mascotaService.updateMascota(mascota).subscribe({
      next: () => this.cargarMascotas(),
      error: (err) => console.error('Error al actualizar mascota:', err)
    });
  }
}
