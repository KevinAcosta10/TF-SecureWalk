import { Component, OnInit, ViewChild } from '@angular/core';
import { Pregunta } from '../../../models/pregunta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PreguntaService } from '../../../services/pregunta.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router'; // Importar Router
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar

@Component({
  selector: 'app-listarpregunta',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatButtonModule, // Añadir MatButtonModule
  ],
  templateUrl: './listarpregunta.component.html',
  styleUrl: './listarpregunta.component.css',
})
export class ListarpreguntaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'pregunta', 'tipo', 'actualizar', 'eliminar']; // Nombres de columnas más descriptivos

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Pregunta> = new MatTableDataSource();
  constructor(
    private pS: PreguntaService,
    private router: Router, // Inyectar Router
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // Asegurar que el paginador se asigne en ambas suscripciones
    });
  }

  eliminar(id: number) {
    this.pS.deleteS(id).subscribe(
      (data) => {
        this.pS.list().subscribe((dataList) => {
          this.pS.setList(dataList);
          this.snackBar.open('Pregunta eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'], // Clase de estilo para éxito
          });
        });
      },
      (error) => {
        this.snackBar.open('Error al eliminar la pregunta. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'], // Clase de estilo para error
        });
      }
    );
  }

  // Método para navegar a la página de inserción
  goToInsert() {
    this.router.navigate(['preguntas/nuevo']);
  }
}