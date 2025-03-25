import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent {

  sendMascota!:Mascota;

  formMascota: Mascota = {
    id: 0,  
    nombre: '',
    edad: 0,
    especie: '',
    raza: '',
    sexo: '', 
    estado: '', 
    imagen: ''
  };

constructor(
  private mascotaService: MascotaService,
  private router: Router

) {}
  // Evento para enviar la mascota al componente padre
  @Output() addMascotaEvent = new EventEmitter<Mascota>();

  // Método para manejar el envío del formulario
  onSubmit() {
    console.log(this.formMascota);
    this.sendMascota = Object.assign({}, this.formMascota);
    this.addMascotaEvent.emit(this.sendMascota);
    this.mascotaService.addMascota(this.sendMascota);
    this.router.navigate(['mascota/tablaMascotas']);
  }
}
