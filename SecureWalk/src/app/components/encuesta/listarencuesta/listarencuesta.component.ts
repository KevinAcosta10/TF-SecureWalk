import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { EncuestaConPreguntasDTO } from '../../../models/encuestaconpreguntasDTO';
import { EncuestaService } from '../../../services/encuesta.service';

@Component({
  selector: 'app-listarencuesta',
  standalone: true,
  imports: [
    CommonModule,          
    MatCardModule,         
    MatButtonModule,       
    MatIconModule,         
    MatExpansionModule    
  ],
  templateUrl: './listarencuesta.component.html',
  styleUrls: ['./listarencuesta.component.css'] 
})
export class ListarencuestaComponent implements OnInit {
  encuestasConPreguntas: EncuestaConPreguntasDTO[] = [];

  constructor(private eS: EncuestaService) { }

  ngOnInit(): void {
    this.cargarEncuestasAgrupadas();
  }

  cargarEncuestasAgrupadas(): void {
    this.eS.listarEncuestasConPreguntasAgrupadas().subscribe({
      next: (data) => {
        this.encuestasConPreguntas = data; 
      },
    });
  }

  // El método 'eliminar' de la tabla original ya no es aplicable directamente aquí,
  // ya que esta vista es para agrupar y mostrar. Si necesitas eliminar una encuesta
  // completa, la lógica sería diferente y probablemente iría en un botón a nivel de la card.
  // Por ahora, lo eliminamos para evitar confusión con la estructura anterior.
  // Si necesitas eliminar una encuesta completa, el botón de la card debería llamar a un método
  // que use eS.deleteS(idEncuesta) y luego recargue la lista.
}