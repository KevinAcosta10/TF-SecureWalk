import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Reporte1Component } from './reporte1/reporte1.component';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [RouterOutlet,Reporte1Component],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {
  constructor(public route:ActivatedRoute){}
}
