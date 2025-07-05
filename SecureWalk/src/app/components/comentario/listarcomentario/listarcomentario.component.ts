import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Comentario } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    MatPaginatorModule,
    MatCardModule
  ],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  comentarios: Comentario[] = [];

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
