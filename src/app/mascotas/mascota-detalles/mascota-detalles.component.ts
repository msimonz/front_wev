import { Component, Input, OnInit } from '@angular/core';
import { Mascota } from '../mascota';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '../../service/mascota.service';

@Component({
  selector: 'app-mascota-detalles',
  templateUrl: './mascota-detalles.component.html',
  styleUrls: ['./mascota-detalles.component.css']
})
export class MascotaDetallesComponent implements OnInit {
  mascota!: Mascota;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const mascotaEncontrada = this.mascotaService.findById(id);
    if (mascotaEncontrada) {
      this.mascota = mascotaEncontrada;
    }
  }
}
