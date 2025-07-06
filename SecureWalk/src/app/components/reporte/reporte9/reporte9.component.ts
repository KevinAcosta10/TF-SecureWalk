import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { RespuestaService } from '../../../services/respuesta.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte9',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './reporte9.component.html',
  styleUrls: ['./reporte9.component.css']
})
export class Reporte9Component implements OnInit {
  hasData = false;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Respuestas por Encuesta' }
    }
  };

  // Tipos de gráficos soportados
  public chartTypes: ChartType[] = [
     'radar'
  ];

  public chartLabels: string[] = [];
  public chartData: ChartDataset[] = [];

  constructor(private respuestaService: RespuestaService) {}

  ngOnInit(): void {
    this.respuestaService.getRespuestaxNombreEncuesta().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;
        this.chartLabels = data.map(item => item.nombre_encuesta);
        this.chartData = [
          {
            data: data.map(item => item.cantRespuesta),
            label: 'Cantidad de Respuestas',
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