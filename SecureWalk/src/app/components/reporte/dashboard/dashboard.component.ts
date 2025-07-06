import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reporte1Component } from '../reporte1/reporte1.component';
import { Reporte2Component } from '../reporte2/reporte2.component';
import { Reporte3Component } from '../reporte3/reporte3.component';
import { Reporte4Component } from '../reporte4/reporte4.component';
import { Reporte5Component } from '../reporte5/reporte5.component';
import { Reporte6Component } from '../reporte6/reporte6.component';
import { Reporte7Component } from '../reporte7/reporte7.component';
import { Reporte8Component } from '../reporte8/reporte8.component';
import { Reporte9Component } from '../reporte9/reporte9.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedIndex: number | null = null;

  public reports = [
    { title: 'Zona X Usuario', component: Reporte1Component },
    { title: 'Incidentes por Usuario', component: Reporte2Component },
    { title: 'Preguntas por Tipo', component: Reporte3Component },
    { title: 'Encuestas por Usuario', component: Reporte4Component },
    { title: 'Comentarios por Zona', component: Reporte5Component },
    { title: 'Aprobación de Incidentes', component: Reporte6Component },
    { title: 'Aprobaciones por Zona', component: Reporte7Component },
    { title: 'Comentarios por Tipo de Pregunta', component: Reporte8Component },
    { title: 'Respuestas por Encuesta', component: Reporte9Component }
  ];

  openChart(index: number) {
    this.selectedIndex = index;
  }

  closeModal() {
    this.selectedIndex = null;
  }
}
