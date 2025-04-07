import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../../service/mascota.service';

@Component({
  selector: 'app-mascota-update',
  templateUrl: './mascota-update.component.html',
  styleUrls: ['./mascota-update.component.css']
})
export class MascotaUpdateComponent implements OnInit {
  mascotaForm!: FormGroup;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    this.mascotaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      estado: ['', Validators.required],
      imagen: ['', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDatosMascota();
  }

  cargarDatosMascota(): void {
    this.mascotaService.findById(this.id).subscribe({
      next: (mascota: Mascota) => {
        this.mascotaForm.patchValue({
          nombre: mascota.nombre,
          edad: mascota.edad,
          tipo: mascota.tipo,
          raza: mascota.raza,
          sexo: mascota.sexo,
          estado: mascota.estado,
          imagen: mascota.imagen
        });
      },
      error: (err) => {
        console.error('Error al cargar mascota:', err);
        alert('Error: No se pudo cargar la mascota');
        this.router.navigate(['/mascota/tablaMascotas']);
      }
    });
  }

  guardarCambios(): void {
    if (this.mascotaForm.valid) {
      const mascotaActualizada: Mascota = {
        id: this.id,
        ...this.mascotaForm.value
      };

      this.mascotaService.updateMascota(mascotaActualizada).subscribe({
        next: () => {
          alert('Mascota actualizada correctamente');
          this.router.navigate(['/mascota/tablaMascotas']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar la mascota');
        }
      });
    } else {
      this.marcarCamposInvalidos();
    }
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.mascotaForm.controls).forEach(key => {
      const control = this.mascotaForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/mascota/tablaMascotas']);
  }
}
