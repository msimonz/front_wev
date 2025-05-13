import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: any = {
    totalTratamientosUltimoMes: 0,
    tratamientosPorTipo: [],
    veterinariosActivos: 0,
    veterinariosInactivos: 0,
    totalMascotas: 0,
    mascotasActivas: 0,
    ventasTotales: 0,
    gananciasTotales: 0,
    top3Tratamientos: []
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getDashboardStats().subscribe(data => {
      console.log('Datos recibidos del backend:', data);
      this.stats = data;
      this.createCharts();
    });
  }
  
  createCharts() {
    // Gráfico de tratamientos por tipo
    const ctxTratamientos = document.getElementById('tratamientosPorTipo') as HTMLCanvasElement;
    new Chart(ctxTratamientos, {
      type: 'bar',
      data: {
        labels: this.stats.tratamientosPorTipo.map((t: any) => t.medicamento),
        datasets: [{
          label: 'Cantidad de Tratamientos',
          data: this.stats.tratamientosPorTipo.map((t: any) => t.cantidad),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Tratamientos por Tipo de Medicamento',
            color: '#FFCC00',
            font: {
              size: 16
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: '#F8FAFC'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: '#F8FAFC'
            }
          }]
        }
      }
    });

    // Gráfico de estado de veterinarios
    const ctxVeterinarios = document.getElementById('estadoVeterinarios') as HTMLCanvasElement;
    new Chart(ctxVeterinarios, {
      type: 'pie',
      data: {
        labels: ['Activos', 'Inactivos'],
        datasets: [{
          data: [this.stats.veterinariosActivos, this.stats.veterinariosInactivos],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Estado de Veterinarios',
            color: '#FFCC00',
            font: {
              size: 16
            }
          },
          legend: {
            labels: {
              color: '#F8FAFC'
            }
          }
        }
      }
    });

    // Gráfico de estado de mascotas
    const ctxMascotas = document.getElementById('estadoMascotas') as HTMLCanvasElement;
    new Chart(ctxMascotas, {
      type: 'doughnut',
      data: {
        labels: ['Mascotas Activas', 'Mascotas Inactivas'],
        datasets: [{
          data: [this.stats.mascotasActivas, this.stats.totalMascotas - this.stats.mascotasActivas],
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Estado de Mascotas',
            color: '#FFCC00',
            font: {
              size: 16
            }
          },
          legend: {
            labels: {
              color: '#F8FAFC'
            }
          }
        }
      }
    });
  }
}
