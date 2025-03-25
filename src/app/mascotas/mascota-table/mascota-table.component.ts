import { Component } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})
export class MascotaTableComponent {
  mascotaSeleccionada!: Mascota;
  mascotaParaActualizar!: Mascota;
  mascotas!: Mascota[];

  constructor(
    private mascotaService: MascotaService
  ) { 
    
  }

  ngOnInit() {
    this.mascotas = this.mascotaService.findAll();
  }

  //metodos
  eliminarMascota(mascota: Mascota) {
    var index = this.mascotas.indexOf(mascota);
    this.mascotas.splice(index, 1);
  }
  agregarMascota(mascota: Mascota) {
    // Agregar la nueva mascota al servicio
    this.mascotaService.addMascota(mascota);
    // Actualizar la lista de mascotas
    this.mascotas = this.mascotaService.findAll();
  }

  actualizarMascota(mascota: Mascota) {
    // Actualizar la mascota en el servicio
    this.mascotaService.updateMascota(mascota);
    // Volver a cargar las mascotas actualizadas
    this.mascotas = this.mascotaService.findAll();
  }
}


