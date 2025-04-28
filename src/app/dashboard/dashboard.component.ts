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
      console.log('Datos de tratamientos:', this.stats.tratamientos);
      this.createCharts();
    });
  }
  
  createCharts() {
    // Gráfico de veterinarios activos e inactivos
    const ctxVeterinarios = document.getElementById('ComparacionNumerodeVeterinariosvsClientes') as HTMLCanvasElement;
    const chartVeterinarios = new Chart(ctxVeterinarios, {
      type: 'bar',
      data: {
        labels: ['Veterinarios Activos', 'Clientes Activos'],
        datasets: [{
          label: 'Veterinarios vs Clientes',
          data: [this.stats.veterinariosActivos, this.stats.clientesActivos], // Datos que provienen del backend
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    // Gráfico de mascotas activas e inactivas
    const ctxMascotas = document.getElementById('mascotasActivasInactivas') as HTMLCanvasElement;
    const chartMascotas = new Chart(ctxMascotas, {
      type: 'pie', // Cambia el tipo a 'pie' para hacer un gráfico de sectores
      data: {
        labels: ['Mascotas Activas', 'Mascotas Inactivas'], // Etiquetas
        datasets: [{
          label: 'Mascotas',
          data: [this.stats.mascotasActivas, this.stats.mascotasInactivas], // Datos
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)'], // Colores de los sectores
          borderColor: ['rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)'], // Bordes de los sectores
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true, // Mostrar leyenda
            position: 'top' // Posición de la leyenda
          },
          tooltip: {
            callbacks: {
              // Personalizar la vista del tooltip
              label: function(tooltipItem: { dataset: { label: string; }; raw: string; }) {
                return tooltipItem.dataset.label + ': ' + tooltipItem.raw; // Mostrar los datos al pasar el mouse
              }
            }
          },
          // Plugin de labels para poner los rótulos directamente en el gráfico
          datalabels: {
            display: true, // Mostrar los rótulos
            color: '#fff', // Color del texto de los rótulos
            font: {
              weight: 'bold', // Establecer el peso de la fuente
              size: 14 // Tamaño de la fuente
            },
            formatter: function(value: any) {
              return value; // Muestra el valor de cada sección
            }
          }
        }
      }
    });



  }
}
