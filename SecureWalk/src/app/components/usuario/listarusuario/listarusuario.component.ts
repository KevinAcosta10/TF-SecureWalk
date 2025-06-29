import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o'

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatCardModule, CommonModule, CarouselModule, MatCardModule], // Agrega el módulo del carrusel
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {

  usuarios:Usuario[] = []

  customOptions: OwlOptions = {
    loop: true, // Repetir el carrusel
    mouseDrag: true, // Permitir arrastrar con el ratón
    touchDrag: true, // Permitir arrastrar con el dedo en dispositivos táctiles
    pullDrag: true,
    dots: false, // Mostrar puntos de navegación
    navSpeed: 700,
    navText: ['<span class="owl-prev-icon">&lsaquo;</span>', '<span class="owl-next-icon">&rsaquo;</span>'],    
    nav: true, // Mostrar flechas de navegación
    slideBy: 1
  }

  constructor(private uS: UsuariosService) { }
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.usuarios = data
    })
     this.uS.getList().subscribe(data => {
      this.usuarios = data
    })
  }
  eliminar(id: number) {
    this.uS.deleteS(id).subscribe(data=>{
      this.uS.list().subscribe(data=>{
        this.uS.setList(data)
      })
    })
  }
}

