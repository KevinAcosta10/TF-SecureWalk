import { Component } from '@angular/core';
import { UsuarioRuta } from '../../../models/usuarioruta';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { UsuariorutaService } from '../../../services/usuarioruta.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarusuarioruta',
  standalone: true,
  imports: [CarouselModule, MatCardModule, MatIconModule,RouterLink, CommonModule],
  templateUrl: './listarusuarioruta.component.html',
  styleUrl: './listarusuarioruta.component.css',
})
export class ListarusuariorutaComponent {
  usuarioruta: UsuarioRuta[] = [];
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
    constructor(private urS: UsuariorutaService) {}
    
      ngOnInit(): void {
        this.urS.list().subscribe((data) => {
          this.usuarioruta = data;
        });
        this.urS.getList().subscribe((data) => {
          this.usuarioruta = data;
        });
      }
      eliminar(id: number) {
        this.urS.deleteS(id).subscribe((data) => {
          this.urS.list().subscribe((data) => {
            this.urS.setList(data);
          });
        });
      }
}
