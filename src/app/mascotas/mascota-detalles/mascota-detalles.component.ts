import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private mascotaService: MascotaService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.mascotaService.findById(id).subscribe({
        next: (mascota) => {
          this.mascota = mascota;
        },
        error: (error) => {
          console.error('Error al cargar mascota:', error);
          alert('Error al cargar los detalles de la mascota');
          this.router.navigate(['/mascota/tablaMascotas']);
        }
      });
    });
  }
}
