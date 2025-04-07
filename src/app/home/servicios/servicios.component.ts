import { Component } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  modalVisible: boolean = false; // Controla la visibilidad de los modales

  // Mostrar el modal
  mostrarModal() {
    this.modalVisible = true;
  }

  // Cerrar el modal
  cerrarModal() {
    this.modalVisible = false;
  }
}
