import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { HeaderComponent } from "src/app/header/header.component";
import { FooterComponent } from "src/app/footer/footer.component";

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css'],
})
export class MascotaTableComponent implements OnInit {
  mascotaSeleccionada!: Mascota;
  mascotaParaActualizar!: Mascota;
  mascotas!: Mascota[];
  @Output() mascotaEliminada = new EventEmitter<Mascota>();

  constructor(
    private mascotaService: MascotaService
  ) { 
    
  }

  ngOnInit() {
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.mascotas = this.mascotaService.findAll();
  }

  //metodos
  eliminarMascota(mascota: Mascota) {
    if (confirm(`¿Está seguro de eliminar a ${mascota.nombre}?`)) {
      this.mascotaService.deleteMascota(mascota.id);
      this.mascotaEliminada.emit(mascota);
      this.cargarMascotas();
    }
  }
  agregarMascota(mascota: Mascota) {
    // Agregar la nueva mascota al servicio
    this.mascotaService.addMascota(mascota);
    // Actualizar la lista de mascotas
    this.cargarMascotas();
  }

  actualizarMascota(mascota: Mascota) {
    // Actualizar la mascota en el servicio
    this.mascotaService.updateMascota(mascota);
    // Volver a cargar las mascotas actualizadas
    this.cargarMascotas();
  }
}


