import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-table',
  templateUrl: './veterinario-table.component.html',
  styleUrls: ['./veterinario-table.component.css']
})
export class VeterinarioTableComponent implements OnInit {
  veterinarios: Veterinario[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadVeterinarios();
  }

  loadVeterinarios(): void {
    this.loading = true;
    this.veterinarioService.getAllVeterinarios().subscribe({
      next: (veterinarios) => {
        this.veterinarios = veterinarios;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los veterinarios';
        this.loading = false;
      }
    });
  }

  deleteVeterinario(id: number): void {
    if (confirm('¿Está seguro de eliminar este veterinario?')) {
      this.veterinarioService.deleteVeterinario(id).subscribe({
        next: () => {
          this.loadVeterinarios();
        },
        error: (error) => {
          this.error = 'Error al eliminar el veterinario';
        }
      });
    }
  }

  editVeterinario(id: number): void {
    this.router.navigate(['/veterinario/editar', id]);
  }
}