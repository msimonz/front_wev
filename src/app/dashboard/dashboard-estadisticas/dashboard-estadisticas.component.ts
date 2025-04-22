import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-estadisticas',
  templateUrl: './dashboard-estadisticas.component.html',
  styleUrls: ['./dashboard-estadisticas.component.css']
})
export class DashboardEstadisticasComponent implements OnInit{
  estadisticas: any;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels = ['Mascotas', 'Clientes', 'Tratamientos'];
  barChartData: ChartData = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'Cantidad' }
    ]
  };

  constructor(private dashboardService: DashboardService) { }
  ngOnInit(): void {
    this.dashboardService.obtenerEstadisticas().subscribe((data) => {
      this.estadisticas = data;
      this.barChartData.datasets[0].data = [
        this.estadisticas.totalMascotas,
        this.estadisticas.totalClientes,
        this.estadisticas.totalTratamientos
      ];
    });
  }
    
}
