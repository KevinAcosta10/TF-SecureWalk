import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UsuariorutaService } from '../../../services/usuarioruta.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte1',
  standalone: true,
  imports: [BaseChartDirective,CommonModule,MatIconModule,CommonModule],
  templateUrl: './reporte1.component.html',
  styleUrl: './reporte1.component.css'
})
export class Reporte1Component implements OnInit {
  hasData = false;

  // Chart configuration
  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 16
        }
      },
      title: {
        display: true,
        text: 'Usuarios por Zona',
        font: {
          size: 18
        }
      }
    }
  };

  public chartType: ChartType = 'bar';  // Cambiado a 'bar'
  public chartLabels: string[] = [];
  public chartData: ChartDataset[] = [];

  constructor(private aS: UsuariorutaService) {}

  ngOnInit(): void {
    this.aS.getZonaxUsuario().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;

        this.chartLabels = data.map(item => item.nombreZona);
        this.chartData = [
          {
            data: data.map(item => item.cantUsuario),
            label: 'Cantidad de Usuarios',
            backgroundColor: [
              '#3F51B5', // Indigo
              '#2196F3', // Blue
              '#00BCD4', // Cyan
              '#4CAF50', // Green
              '#CDDC39', // Lime
              '#FFC107', // Amber
              '#FF5722', // Deep Orange
              '#9C27B0'  // Purple
            ],
            borderColor: '#ffffff',
            borderWidth: 2
          }
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
