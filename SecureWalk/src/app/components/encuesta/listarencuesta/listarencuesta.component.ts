import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Importar DatePipe para el pipe de fecha
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { EncuestaConPreguntasDTO } from '../../../models/encuestaconpreguntasDTO';
import { EncuestaService } from '../../../services/encuesta.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { Router } from '@angular/router'; // Importar Router para navegación

@Component({
  selector: 'app-listarencuesta',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    DatePipe // Añadir DatePipe para usar el pipe en el template
  ],
  templateUrl: './listarencuesta.component.html',
  styleUrls: ['./listarencuesta.component.css']
})
export class ListarencuestaComponent implements OnInit {
  encuestasConPreguntas: EncuestaConPreguntasDTO[] = [];

  constructor(
    private eS: EncuestaService,
    private snackBar: MatSnackBar, // Inyectar MatSnackBar
    private router: Router // Inyectar Router
  ) { }

  ngOnInit(): void {
    this.cargarEncuestasAgrupadas();
  }

  cargarEncuestasAgrupadas(): void {
    this.eS.listarEncuestasConPreguntasAgrupadas().subscribe({
      next: (data) => {
        this.encuestasConPreguntas = data;
        if (data.length === 0) {
          this.snackBar.open('No se encontraron encuestas para mostrar.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-info'] // Clase para estilos de información
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar encuestas:', err);
        this.snackBar.open('Error al cargar las encuestas. Inténtalo de nuevo más tarde.', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'] // Clase para estilos de error
        });
      }
    });
  }

  // Método para navegar a la página de inserción de encuestas (si existe)
  goToInsertSurvey(): void {
    this.router.navigate(['encuestas/nuevo']); // Ajusta la ruta según tu configuración
  }
}