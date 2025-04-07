import { Component } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent {
  formMascota: Mascota = {
    id: 0,
    nombre: '',
    edad: 0,
    tipo: '',
    raza: '',
    sexo: '', 
    estado: '', 
    imagen: ''
  };

  constructor(
    private mascotaService: MascotaService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.validarFormulario()) {
      const mascotaParaEnviar = {
        nombre: this.formMascota.nombre,
        edad: this.formMascota.edad,
        tipo: this.formMascota.tipo,
        raza: this.formMascota.raza,
        sexo: this.formMascota.sexo,
        estado: this.formMascota.estado,
        imagen: this.formMascota.imagen
      };

      this.mascotaService.addMascota(mascotaParaEnviar)
        .subscribe({
          next: (response) => {
            console.log('Mascota agregada exitosamente', response);
            alert('Mascota creada con éxito');
            this.router.navigate(['/mascota/tablaMascotas']);
          },
          error: (error) => {
            console.error('Error al agregar mascota:', error);
            alert('Error al agregar la mascota: ' + error.message);
          }
        });
    } else {
      alert('Por favor, complete todos los campos requeridos');
    }
  }

  validarFormulario(): boolean {
    return !!(this.formMascota.nombre && 
              this.formMascota.edad && 
              this.formMascota.tipo && 
              this.formMascota.raza && 
              this.formMascota.sexo && 
              this.formMascota.estado);
  }

  cancelar() {
    this.router.navigate(['/mascota/tablaMascotas']);
  }
}
