import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { EncuestaService } from '../../../services/encuesta.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte4',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './reporte4.component.html',
  styleUrls: ['./reporte4.component.css']
})
export class Reporte4Component implements OnInit {
  hasData = false;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Encuestas por Usuario' }
    }
  };

  // Tipos de gráfico disponibles
  public chartTypes: ChartType[] = [
     'radar'
  ];

  public chartLabels: string[] = [];
  public chartData: ChartDataset[] = [];

  constructor(private encuestaService: EncuestaService) {}

  ngOnInit(): void {
    this.encuestaService.getNombreEncuestaxUsuario().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;
        this.chartLabels = data.map(item => item.nombreEncuesta);
        this.chartData = [
          {
            data: data.map(item => item.cantUsuario),
            label: 'Cantidad de Usuarios',
            backgroundColor: [
              '#FF9999', '#FF6666', '#FF3333', '#FF0000',
              '#CC0000', '#990000', '#660000', '#B22222'
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