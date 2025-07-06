import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { EvaluacionincidenteService } from '../../../services/evaluacionincidente.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte6',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './reporte6.component.html',
  styleUrls: ['./reporte6.component.css']
})
export class Reporte6Component implements OnInit {
  hasData = false;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Aprobación de Incidentes por Usuario' }
    }
  };

  // Tipos de gráficos soportados
  public chartTypes: ChartType[] = [
    'bar'
  ];

  public chartLabels: string[] = [];
  public chartData: ChartDataset[] = [];

  constructor(private evaluacionService: EvaluacionincidenteService) {}

  ngOnInit(): void {
    this.evaluacionService.getAprobacionIncidente().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;
        this.chartLabels = data.map(item => item.aprobacionIncidente);
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
