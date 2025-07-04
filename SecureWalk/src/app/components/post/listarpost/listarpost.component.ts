import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listarpost',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    CarouselModule,
    CommonModule
  ],
  templateUrl: './listarpost.component.html',
  styleUrl: './listarpost.component.css'
})
export class ListarpostComponent {
  posts: Post[] = []
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

  constructor(private pS: PostService) {
   }
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.posts = data;
    });
    this.pS.getList().subscribe((data) => {
      this.posts = data;
    });
  }
  eliminar(id: number) {
    this.pS.deleteS(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}
