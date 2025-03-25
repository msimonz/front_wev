import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mascota } from '../mascota';
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
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    const mascota = this.mascotaService.findById(this.id);
    if (!mascota) {
      console.error('Mascota no encontrada');
      this.router.navigate(['/mascotas/tablaMascotas']);
      return;
    }
    
    this.mascotaForm = this.formBuilder.group({
      id: [mascota.id],
      nombre: [mascota.nombre],
      edad: [mascota.edad],  
      especie: [mascota.especie],
      raza: [mascota.raza],
      sexo: [mascota.sexo],
      estado: [mascota.estado],
      imagen: [mascota.imagen]
    });
  }

  guardarCambios(): void {
    if (this.mascotaForm.valid) {
      const mascotaActualizada: Mascota = {
        ...this.mascotaForm.value,
        id: this.id
      };

      try {
        const actualizada = this.mascotaService.updateMascota(mascotaActualizada);
        console.log('Respuesta del servicio:', actualizada); // Para debug
        
        if (actualizada) {
          this.router.navigate(['/mascotas/tablaMascotas']);
        }
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    } else {
      console.log('Formulario inválido:', this.mascotaForm.errors);
    }
  }

  cancelar(): void {
    this.router.navigate(['/mascota/tablaMascotas']);
  }
}