import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { EncuestaPregunta } from '../../../models/encuestapregunta';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { EncuestapreguntaService } from '../../../services/encuestapregunta.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-listarencuestapregunta',
  standalone: true,
  imports: [
CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    CarouselModule,
    RouterLink
  ],
  templateUrl: './listarencuestapregunta.component.html',
  styleUrl: './listarencuestapregunta.component.css'
})
export class ListarencuestapreguntaComponent implements OnInit{
  encuestaPregunta: EncuestaPregunta[] = [];
  
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
  
    constructor(private epS: EncuestapreguntaService) {}
    
      ngOnInit(): void {
        this.epS.list().subscribe((data) => {
          this.encuestaPregunta = data;
        });
        this.epS.getList().subscribe((data) => {
          this.encuestaPregunta = data;
        });
      }
      eliminar(id: number) {
        this.epS.deleteS(id).subscribe((data) => {
          this.epS.list().subscribe((data) => {
            this.epS.setList(data);
          });
        });
      }
}