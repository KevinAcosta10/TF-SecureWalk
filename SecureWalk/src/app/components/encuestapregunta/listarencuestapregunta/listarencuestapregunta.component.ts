import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { EncuestaPregunta } from '../../../models/encuestapregunta';
import { EncuestapreguntaService } from '../../../services/encuestapregunta.service';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-listarencuestapregunta',
  standalone: true,
  imports: [
CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './listarencuestapregunta.component.html',
  styleUrl: './listarencuestapregunta.component.css'
})
export class ListarencuestapreguntaComponent implements OnInit{
  encuestaPregunta: EncuestaPregunta[] = [];
  
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