import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Veterinario } from 'src/app/model/veterinario';
import { Tratamiento } from 'src/app/model/tratamiento';

@Component({
  selector: 'app-veterinario-detalles',
  templateUrl: './veterinario-detalles.component.html',
  styleUrls: ['./veterinario-detalles.component.css']
})
export class VeterinarioDetallesComponent implements OnInit {
  veterinario: Veterinario | null = null;
  tratamientos: Tratamiento[] = [];
  errorTratamientos: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veterinarioService: VeterinarioService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadVeterinarioDetails(id);
        this.loadTratamientos(id);
      }
    });
  }

  loadVeterinarioDetails(id: number): void {
    this.veterinarioService.findById(id).subscribe({
      next: (veterinario) => {
        this.veterinario = veterinario;
      },
      error: (error) => {
        console.error('Error al cargar el veterinario:', error);
        this.errorTratamientos = 'No se pudo cargar la información del veterinario.';
        this.router.navigate(['/veterinario/login']);
      }
    });
  }

  loadTratamientos(id: number): void {
    this.loading = true;
    this.veterinarioService.getTratamientosByVeterinario(id).subscribe({
        next: (tratamientos: Tratamiento[]) => {
            this.tratamientos = tratamientos;
            this.loading = false;
        },
        error: (error) => {
            console.error('Error al cargar los tratamientos:', error);
            this.errorTratamientos = 'No se pudieron cargar los tratamientos del veterinario.';
            this.loading = false;
        }
    });
}
}