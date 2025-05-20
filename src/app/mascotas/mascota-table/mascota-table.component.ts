import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css'],
})
export class MascotaTableComponent implements OnInit {
  mascotaSeleccionada!: Mascota;
  mascotaParaActualizar!: Mascota;
  mascotas: Mascota[] = [];
  esVeterinarioActivo: boolean = false;

  @Output() mascotaEliminada = new EventEmitter<Mascota>();

  constructor(
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService
  ) {}

  ngOnInit() {
    this.cargarMascotas();
    this.esVeterinarioActivo = this.veterinarioService.isVeterinarioLogueado() && this.veterinarioService.getVeterinarioLogueado()?.estado == 'Activo';
  }

  cargarMascotas() {
    this.mascotaService.findAll().subscribe({
      next: (mascotas) => {(this.mascotas = mascotas);
        console.log("Mascotas", this.mascotas[0].imagenUrl);
      },
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
