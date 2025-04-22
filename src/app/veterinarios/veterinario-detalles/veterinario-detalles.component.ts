import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Veterinario } from 'src/app/model/veterinario';

@Component({
  selector: 'app-veterinario-detalles',
  templateUrl: './veterinario-detalles.component.html',
  styleUrls: ['./veterinario-detalles.component.css']
})
export class VeterinarioDetallesComponent implements OnInit {
  veterinario: Veterinario | null = null;
  errorTratamientos: string = '';  // Mensaje de error si no hay tratamientos

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veterinarioService: VeterinarioService
  ) { }

  ngOnInit(): void {
    // Obtén el id del veterinario desde la URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadVeterinarioDetails(id);
      }
    });
  }

  loadVeterinarioDetails(id: number): void {
    // Cargar detalles del veterinario desde el servicio
    this.veterinarioService.findById(id).subscribe({
      next: (veterinario) => {
        this.veterinario = veterinario;
      },
      error: (error) => {
        console.error('Error al cargar el veterinario:', error);
        this.errorTratamientos = 'No se pudo cargar la información del veterinario.';
        this.router.navigate(['/veterinario/login']);  // Redirigir a la página de login si hay un error
      }
    });
  }
}
