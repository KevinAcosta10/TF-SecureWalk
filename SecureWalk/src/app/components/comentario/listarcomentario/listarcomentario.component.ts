import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Añadir ViewChild y AfterViewInit
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Comentario } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importar MatPaginator
import { MatTableDataSource } from '@angular/material/table'; // Importar MatTableDataSource
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar para notificaciones

@Component({
  selector: 'app-listarcomentario',
  standalone: true, // Asegurar que sea standalone si no está ya
  imports: [
    MatTableModule, // Se mantiene si se usa una tabla, si solo son cards podría quitarse
    MatIconModule,
    CommonModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatPaginatorModule,
    // MatCardModule, // Ya está importado una vez, no es necesario duplicar
  ],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent implements OnInit, AfterViewInit { // Implementar AfterViewInit

  // dataSource: Usaremos MatTableDataSource para gestionar los datos y la paginación
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource();

  // Referencia al paginador en el HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cS: ComentarioService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {}

  ngOnInit(): void {
    // Suscribirse a la lista inicial de Comentarios
    this.cS.list().subscribe((data) => {
      this.dataSource.data = data; // Asignar los datos al dataSource
    });

    // Suscribirse a los cambios en la lista (ej. después de una eliminación o adición)
    this.cS.getList().subscribe((data) => {
      this.dataSource.data = data; // Actualizar los datos del dataSource
      // Asegurarse de que el paginador esté conectado y se resetee a la primera página si los datos cambian
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  // ngAfterViewInit es el ciclo de vida donde @ViewChild asegura que el paginador está disponible
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.cS.deleteS(id).subscribe(
      () => {
        this.cS.list().subscribe((dataList) => {
          this.cS.setList(dataList); // Actualiza la lista en el servicio, lo que a su vez actualiza el dataSource
          this.snackBar.open('Comentario eliminado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        });
      },
      (error) => {
        console.error('Error al eliminar el comentario:', error);
        this.snackBar.open('Error al eliminar el comentario. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    );
  }
}