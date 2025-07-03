import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { EvaluacionIncidente } from '../../../models/evaluacionincidente';
import { EvaluacionincidenteService } from '../../../services/evaluacionincidente.service';

@Component({
  selector: 'app-listarevaluacionincidente',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    CarouselModule,
  ],
  templateUrl: './listarevaluacionincidente.component.html',
  styleUrl: './listarevaluacionincidente.component.css',
})
export class ListarevaluacionincidenteComponent {
  evaluacionincidente: EvaluacionIncidente[] = [];
  enable: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Aprobado' },
    { value: false, viewValue: 'Desaprobado' },
  ];
  customOptions: OwlOptions = {
    loop: false, // Repetir el carrusel
    mouseDrag: true, // Permitir arrastrar con el ratón
    touchDrag: true, // Permitir arrastrar con el dedo en dispositivos táctiles
    pullDrag: true,
    dots: false, // Mostrar puntos de navegación
    navSpeed: 700,
    navText: [
      '<span class="owl-prev-icon">&lsaquo;</span>',
      '<span class="owl-next-icon">&rsaquo;</span>',
    ],
    nav: true, // Mostrar flechas de navegación
    slideBy: 1,
  };

  constructor(private eS: EvaluacionincidenteService) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.evaluacionincidente = data;
    });
    this.eS.getList().subscribe((data) => {
      this.evaluacionincidente = data;
    });
  }
  eliminar(id: number) {
    this.eS.deleteS(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}
