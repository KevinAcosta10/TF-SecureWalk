import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-buscarusuario',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    MatCardModule,
    CommonModule,
    CarouselModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './buscarusuario.component.html',
  styleUrl: './buscarusuario.component.css',
})
export class BuscarusuarioComponent {
  form: FormGroup;
  usuarios: Usuario[] = [];

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

  mensaje: string = '';
  notResults: boolean = false;

  usuarioBusqueda: string = '';

  constructor(private uS: UsuariosService, private fb: FormBuilder) {
    this.form = fb.group({
      usuario: [''],
    });
  }

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });
    this.uS.getList().subscribe((data) => {
      this.usuarios = data;
    });
    this.form.get('usuario')?.valueChanges.subscribe((value) => {
      this.usuarioBusqueda = value;
      this.buscar();
    });
  }
  eliminar(id: number) {
    this.uS.deleteS(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }

  buscar() {
    if (this.usuarioBusqueda.trim()) {
      this.uS.searchUser(this.usuarioBusqueda).subscribe(data => {
        this.usuarios = data
        this.notResults = data.length === 0
      })
    } else {
      this.uS.list().subscribe(data => {
        this.usuarios = data
        this.notResults = false
      })
    }

  }
}
