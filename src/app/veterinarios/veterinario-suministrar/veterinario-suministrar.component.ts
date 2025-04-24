import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { Veterinario } from 'src/app/model/veterinario';
import { Mascota } from 'src/app/model/mascota';
import { Tratamiento } from 'src/app/model/tratamiento';

@Component({
  selector: 'app-veterinario-suministrar',
  templateUrl: './veterinario-suministrar.component.html',
  styleUrls: ['./veterinario-suministrar.component.css']
})
export class VeterinarioSuministrarComponent implements OnInit {
  mascotas: Mascota[] = [];
  tratamientos: Tratamiento[] = [];
  veterinario: Veterinario | null = null;
  loading: boolean = true;
  error: string = '';
  mascotaSeleccionada: Mascota | null = null;
  tratamientoSeleccionado: Tratamiento | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private veterinarioService: VeterinarioService,
    private mascotaService: MascotaService
  ) { }

  ngOnInit(): void {
    // Verificar si hay un veterinario logueado
    this.veterinario = this.veterinarioService.getVeterinarioLogueado();
    if (!this.veterinario) {
      this.router.navigate(['/veterinario/login']);
      return;
    }

    // Obtener el ID de la mascota de la URL
    this.route.params.subscribe(params => {
      const mascotaId = params['id'];
      if (mascotaId) {
        this.cargarMascotaSeleccionada(mascotaId);
      } else {
        this.cargarDatos();
      }
    });
  }

  cargarMascotaSeleccionada(id: number): void {
    this.loading = true;
    this.mascotaService.findById(id).subscribe({
      next: (mascota) => {
        this.mascotas = [mascota];
        this.mascotaSeleccionada = mascota;
        this.cargarTratamientos();
      },
      error: (error) => {
        console.error('Error al cargar la mascota:', error);
        this.error = 'Error al cargar la mascota seleccionada';
        this.loading = false;
      }
    });
  }

  cargarTratamientos(): void {
    if (this.veterinario) {
      this.veterinarioService.getTratamientos(this.veterinario.id).subscribe({
        next: (tratamientos) => {
          this.tratamientos = tratamientos;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar tratamientos:', error);
          this.error = 'Error al cargar los tratamientos';
          this.loading = false;
        }
      });
    }
  }

  cargarDatos(): void {
    this.loading = true;
    // Cargar mascotas
    this.mascotaService.findAll().subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.cargarTratamientos();
      },
      error: (error) => {
        console.error('Error al cargar mascotas:', error);
        this.error = 'Error al cargar las mascotas';
        this.loading = false;
      }
    });
  }

  seleccionarMascota(mascota: Mascota): void {
    this.mascotaSeleccionada = mascota;
  }

  seleccionarTratamiento(tratamiento: Tratamiento): void {
    this.tratamientoSeleccionado = tratamiento;
  }

  asignarTratamiento(): void {
    if (!this.mascotaSeleccionada || !this.tratamientoSeleccionado || !this.veterinario) {
      this.error = 'Por favor seleccione una mascota y un tratamiento';
      return;
    }

    this.loading = true;
    this.error = '';

    this.mascotaService.asignarTratamiento(
      this.mascotaSeleccionada.id,
      this.tratamientoSeleccionado.id,
      this.veterinario.id
    ).subscribe({
      next: (response: any) => {
        if (response.error) {
          this.error = response.error;
        } else {
          alert('Tratamiento asignado correctamente');
          this.tratamientoSeleccionado = null;
          // Recargar los tratamientos
          this.cargarTratamientos();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al asignar tratamiento:', error);
        this.error = error.error?.error || 'Error al asignar el tratamiento';
        this.loading = false;
      }
    });
  }
}
