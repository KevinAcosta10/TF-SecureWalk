import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Comentario } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';

@Component({
  selector: 'app-listarcomentario',
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
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  comentarios: Comentario[] = [];
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

  constructor(private cS: ComentarioService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.comentarios = data;
    });
    this.cS.getList().subscribe((data) => {
      this.comentarios = data;
    });
  }
  eliminar(id: number) {
    this.cS.deleteS(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
