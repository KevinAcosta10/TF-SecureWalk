import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { PreguntaService } from '../../../services/pregunta.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte3',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './reporte3.component.html',
  styleUrls: ['./reporte3.component.css']
})
export class Reporte3Component implements OnInit {
  hasData = false;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Preguntas por Tipo'
      }
    }
  };

  public chartTypes: ChartType[] = [
   'doughnut'
  ];
  public chartLabels: string[] = [];
  public chartData: ChartDataset[] = [];

  constructor(private preguntaService: PreguntaService) {}

  ngOnInit(): void {
    this.preguntaService.getTipoPreguntaxPregunta().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;
        this.chartLabels = data.map(item => item.tipoPregunta);
        this.chartData = [
          {
            data: data.map(item => item.cantPregunta),
            label: 'Cantidad de Preguntas',
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