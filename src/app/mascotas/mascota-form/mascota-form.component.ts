import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../mascota';
import { MascotaService } from '../../service/mascota.service';

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


  // Evento para enviar la mascota al componente padre
  @Output() addMascotaEvent = new EventEmitter<Mascota>();

  // Método para manejar el envío del formulario
  addMascota() {
    console.log(this.formMascota);
    
    // Copiar los valores del formulario
    this.sendMascota = Object.assign({}, this.formMascota);

    // Emitir el evento al componente padre
    this.addMascotaEvent.emit(this.sendMascota);
  }
}
