import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: any = {};

  constructor(private DashboardService:DashboardService) {}

  ngOnInit() {
    this.DashboardService.getDashboardStats().subscribe(data => {
      this.stats = data;
      console.log(this.stats);
      this.createCharts();
    });
  }
  
  createCharts() {
    // Gráfico de tratamientos por medicamento
    const ctx = document.getElementById('tratamientosPorMedicamento') as HTMLCanvasElement;
    const chart = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico, puedes cambiarlo
      data: {
        labels: this.stats.tratamientosPorMedicamento.map((item: { medicamento: string, cantidad: number }) => item.medicamento),
        datasets: [{
          label: 'Tratamientos por Medicamento',
          data: this.stats.tratamientosPorMedicamento.map((item: { medicamento: string, cantidad: number }) => item.cantidad),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });

    // Gráfico de veterinarios activos e inactivos
    const ctxVeterinarios = document.getElementById('veterinariosActivos') as HTMLCanvasElement;
    const chartVeterinarios = new Chart(ctxVeterinarios, {
      type: 'bar',
      data: {
        labels: ['Veterinarios Activos'],
        datasets: [{
          label: 'Veterinarios',
          data: [this.stats.veterinariosActivos], // Datos que provienen del backend
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      }
    });
    // Gráfico de mascotas activas e inactivas
    const ctxMascotas = document.getElementById('mascotasActivasInactivas') as HTMLCanvasElement;
    const chartMascotas = new Chart(ctxMascotas, {
      type: 'bar',
      data: {
        labels: ['Mascotas Activas', 'Mascotas Inactivas'],
        datasets: [{
          label: 'Mascotas',
          data: [this.stats.mascotasActivas, this.stats.mascotasInactivas], // Datos que provienen del backend
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true // Escala del eje Y comenzando desde 0
            }
          }]
        }
      }
    });
  }
}
