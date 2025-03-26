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
    // Inicializar el formulario con validadores
    this.mascotaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required, Validators.min(0)]],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      estado: ['', Validators.required],
      imagen: ['', Validators.required]
    });

    // Obtener el ID de la ruta y cargar los datos
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDatosMascota();
  }

  cargarDatosMascota(): void {
    const mascota = this.mascotaService.findById(this.id);
    if (mascota) {
      this.mascotaForm.patchValue({
        nombre: mascota.nombre,
        edad: mascota.edad,
        especie: mascota.especie,
        raza: mascota.raza,
        sexo: mascota.sexo,
        estado: mascota.estado,
        imagen: mascota.imagen
      });
    } else {
      alert('Mascota no encontrada');
      this.router.navigate(['/mascota/tablaMascotas']);
    }
  }

  guardarCambios(): void {
    if (this.mascotaForm.valid) {
      const mascotaActualizada: Mascota = {
        id: this.id,
        ...this.mascotaForm.value
      };
      try {
        const actualizada = this.mascotaService.updateMascota(mascotaActualizada);
        console.log('Respuesta del servicio:', actualizada); // Para debug
        
        if (actualizada) {
          this.router.navigate(['/mascota/tablaMascotas']);
        }
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    } 
  }

  cancelar(): void {
    this.router.navigate(['/mascota/tablaMascotas']);
  }
}