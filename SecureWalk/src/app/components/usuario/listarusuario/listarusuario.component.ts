import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css',
})
export class ListarusuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  form: FormGroup;
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

  // ELIMINADO: toggleCardsVisibility() {}

  eliminar(id: number) {
    this.uS.deleteS(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }

  buscar() {
    if (this.usuarioBusqueda.trim()) {
      this.uS.searchUser(this.usuarioBusqueda).subscribe((data) => {
        this.usuarios = data;
        this.notResults = data.length === 0;
        // Si no hay resultados, las tarjetas no se mostrarán por el *ngIf="!notResults"
        // Si hay resultados, se mostrarán. No necesitamos ajustar cardsVisible aquí.
      });
    } else {
      this.uS.list().subscribe((data) => {
        this.usuarios = data;
        this.notResults = false;
        // Las tarjetas se mostrarán por defecto.
      });
    }
  }
}