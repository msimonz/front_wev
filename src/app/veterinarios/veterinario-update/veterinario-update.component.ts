import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Veterinario } from 'src/app/model/veterinario';

@Component({
  selector: 'app-veterinario-update',
  templateUrl: './veterinario-update.component.html',
  styleUrls: ['./veterinario-update.component.css']
})
export class VeterinarioUpdateComponent implements OnInit {
  veterinario: Veterinario = {
    id: 0,
    nombre: '',
    telefono: '',
    email: '',
    usuario: '',
    contrasena: '',
    tratamientos: []
  };
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veterinarioService: VeterinarioService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadVeterinario(id);
      }
    });
  }

  loadVeterinario(id: number): void {
    this.loading = true;
    this.veterinarioService.findById(id).subscribe({
      next: (veterinario) => {
        this.veterinario = veterinario;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el veterinario';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.veterinario.id) {
      this.veterinarioService.updateVeterinario(this.veterinario.id, this.veterinario).subscribe({
        next: () => {
          this.router.navigate(['/veterinario/tablaVeterinarios'], { 
            queryParams: { 
              success: 'Veterinario actualizado exitosamente' 
            }
          });
        },
        error: (error) => {
          this.error = 'Error al actualizar el veterinario';
        }
      });
    }
  }
}
