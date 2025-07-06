import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { IncidenteService } from '../../../services/incidente.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte2',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {
  hasData = false;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Incidentes por Usuario'
      }
    }
  };

  // Todos los tipos de gráficos soportados por Chart.js/ng2-charts
  public chartTypes: ChartType[] = [
    'pie'
  ];
  public chartLabels: string[] = [];
  public chartData: ChartDataset[] = [];

  constructor(private incidenteService: IncidenteService) { }

  ngOnInit(): void {
    this.incidenteService.getIncidentePorUsuario().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;
        this.chartLabels = data.map(item => item.tipoIncidente);
        this.chartData = [
          {
            data: data.map(item => item.cantUsuario),
            label: 'Cantidad de Usuarios',
            backgroundColor: [
              '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50',
              '#CDDC39', '#FFC107', '#FF5722', '#9C27B0'
            ],
            borderColor: '#ffffff',
            borderWidth: 1
          }
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
