import { Component } from '@angular/core';
import { Incidente } from '../../../models/incidente';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IncidenteService } from '../../../services/incidente.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-listarincidente',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    CarouselModule,
    MatCardModule
  ],
  templateUrl: './listarincidente.component.html',
  styleUrl: './listarincidente.component.css',
})
export class ListarincidenteComponent {
  incidentes: Incidente[] = [];

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

  constructor(private iS: IncidenteService) {}

  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.incidentes = data;
    });
    this.iS.getList().subscribe((data) => {
      this.incidentes = data;
    });
  }
  eliminar(id: number) {
    this.iS.deleteS(id).subscribe((data) => {
      this.iS.list().subscribe((data) => {
        this.iS.setList(data);
      });
    });
  }
}
