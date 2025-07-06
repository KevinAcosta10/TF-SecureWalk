import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ComentarioService } from '../../../services/comentario.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte5',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './reporte5.component.html',
  styleUrls: ['./reporte5.component.css']
})
export class Reporte5Component implements OnInit {
  hasData = false;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Comentarios por Zona' }
    }
  };

  // Todos los tipos de gráficos disponibles
  public chartTypes: ChartType[] = [
     'polarArea'
  ];

  public chartLabels: string[] = [];
  public chartData: ChartDataset[] = [];

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.comentarioService.getNombreZonaxComentario().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;
        this.chartLabels = data.map(item => item.nombre_zona);
        this.chartData = [
          {
            data: data.map(item => item.cantComentario),
            label: 'Cantidad de Comentarios',
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