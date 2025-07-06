import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ZonaService } from '../../../services/zona.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte7',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './reporte7.component.html',
  styleUrls: ['./reporte7.component.css']
})
export class Reporte7Component implements OnInit {
  hasData = false;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Aprobaciones por Zona' }
    }
  };

  // Tipos de gráficos soportados
  public chartTypes: ChartType[] = [
     'pie'
  ];

  public chartLabels: string[] = [];
  public chartData: ChartDataset[] = [];

  constructor(private zonaService: ZonaService) {}

  ngOnInit(): void {
    this.zonaService.getNombreZonaxAprobacion().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;
        this.chartLabels = data.map(item => item.nombre_zona);
        this.chartData = [
          {
            data: data.map(item => item.cantAprobacion),
            label: 'Cantidad de Aprobaciones',
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