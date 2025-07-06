import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ComentarioService } from '../../../services/comentario.service';

@Component({
  selector: 'app-reporte8',
  standalone: true,
  imports: [BaseChartDirective,CommonModule,MatIconModule,CommonModule],
  templateUrl: './reporte8.component.html',
  styleUrl: './reporte8.component.css'
})
export class Reporte8Component implements OnInit{
   hasData = false;
  barChartOptions:ChartOptions={
    responsive:true
  }

  barChartLabels:string[]=[]
  barChartType:ChartType='doughnut'
  barChartLegend=true
  barChartData:ChartDataset[]=[]


  constructor(private aS:ComentarioService){}
ngOnInit(): void {
    this.aS.getComentarioxTipoPregunta().subscribe(data=>{
       if (data.length > 0) {
                this.hasData = true;

      this.barChartLabels=data.map(item=>item.tipo_pregunta)
      this.barChartData=[
        {
          data:data.map(item=>item.cantComentario),
          label:'Comentario x Tipo Pregunta',
          backgroundColor:[
    '#CC0000', // Rojo intenso
    '#FF0000', // Rojo estándar

    '#990000', // Rojo oscuro
    '#FF9999', // Rojo claro
    '#FF6666', // Rojo suave
    '#FF3333', // Rojo medio
    '#660000', // Rojo muy oscuro
    '#B22222', // Rojo fuego
          ],
           borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        }
        
      ]
       }else{
                this.hasData = false;

       }

    })
}
}