import { Component } from '@angular/core';
import { Respuesta } from '../../../models/respuesta';
import { CarouselModule, OwlOptions, SlideModel } from 'ngx-owl-carousel-o';
import { RespuestaService } from '../../../services/respuesta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarrespuesta',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent {
 respuesta: Respuesta[] = [];
  
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

  constructor(private rS: RespuestaService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.respuesta = data;
    });
    this.rS.getList().subscribe((data) => {
      this.respuesta = data;
    });
  }
  eliminar(id: number) {
    this.rS.deleteS(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
