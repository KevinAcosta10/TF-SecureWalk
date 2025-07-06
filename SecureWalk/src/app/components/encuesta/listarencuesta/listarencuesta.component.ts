import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Encuesta } from '../../../models/encuesta'; // Asegúrate de que esta ruta sea correcta
import { EncuestaService } from '../../../services/encuesta.service'; // Asegúrate de que esta ruta sea correcta
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarencuesta',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    DatePipe,
    RouterModule,
    MatPaginatorModule 
  ],
  templateUrl: './listarencuesta.component.html',
  styleUrls: ['./listarencuesta.component.css']
})
export class ListarencuestaComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Encuesta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private eS: EncuestaService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.eS.getList().subscribe((data) => {
      this.dataSource.data = data;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage(); 
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.eS.deleteS(id).subscribe(
      () => {
        this.eS.list().subscribe((dataList) => {
          this.eS.setList(dataList); // Actualiza la lista en el servicio
          this.snackBar.open('Encuesta eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'], // Clase personalizada para estilo de éxito
          });
        });
      },
      (error) => {
        console.error('Error al eliminar la encuesta:', error);
        this.snackBar.open('Error al eliminar la encuesta. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'], // Clase personalizada para estilo de error
        });
      }
    );
  }
}
