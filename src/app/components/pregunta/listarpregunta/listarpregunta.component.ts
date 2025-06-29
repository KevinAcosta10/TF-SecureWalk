import { Component, OnInit, ViewChild } from '@angular/core';
import { Pregunta } from '../../../models/pregunta';
import {  MatTableModule } from '@angular/material/table';
import { PreguntaService } from '../../../services/pregunta.service';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarpregunta',
  standalone: true,
  imports: [MatTableModule,CommonModule, MatPaginatorModule, MatIconModule, RouterLink,MatCardModule],
  templateUrl: './listarpregunta.component.html',
  styleUrl: './listarpregunta.component.css',
})
export class ListarpreguntaComponent implements OnInit {
  preguntas: Pregunta[] = [];

  constructor(private pS: PreguntaService) {}

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.preguntas = data;
      this.pS.setList(data);
    });
    this.pS.getList().subscribe(data => {
      this.preguntas = data;
    });
  }

  eliminar(id: number) {
    this.pS.deleteS(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.preguntas = data;
        this.pS.setList(data);
      });
    });
  }
}