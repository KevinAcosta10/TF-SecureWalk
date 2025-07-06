import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Añadir ViewChild y AfterViewInit
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importar MatPaginator
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Importar MatTableDataSource
import { MatCardModule } from '@angular/material/card'; // Necesario para mat-card
import { MatButtonModule } from '@angular/material/button'; // Necesario para mat-button
import { MatIconModule } from '@angular/material/icon'; // Necesario para mat-icon
import { RouterLink } from '@angular/router'; // Necesario para routerLink
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar para notificaciones

@Component({
    selector: 'app-listarrespuesta',
    imports: [
        CommonModule,
        MatPaginatorModule, // Asegurar que esté
        MatTableModule, // Asegurar que esté para MatTableDataSource
        MatCardModule, // Asegurar que esté
        MatButtonModule, // Asegurar que esté
        MatIconModule, // Asegurar que esté // Asegurar que esté
    ],
    templateUrl: './listarrespuesta.component.html',
    styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent implements OnInit, AfterViewInit { // Implementar AfterViewInit

  // dataSource: Usaremos MatTableDataSource para gestionar los datos y la paginación
  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource();

  // Referencia al paginador en el HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // customOptions: OwlOptions; // Ya no es necesario

  constructor(
    private rS: RespuestaService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) { }

  ngOnInit(): void {
    // Suscribirse a la lista inicial de Respuestas
    this.rS.list().subscribe((data) => {
      this.dataSource.data = data; // Asignar los datos al dataSource
    });

    // Suscribirse a los cambios en la lista (ej. después de una eliminación o adición)
    this.rS.getList().subscribe((data) => {
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
    this.rS.deleteS(id).subscribe(
      () => {
        this.rS.list().subscribe((dataList) => {
          this.rS.setList(dataList); // Actualiza la lista en el servicio, lo que a su vez actualiza el dataSource
          this.snackBar.open('Respuesta eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'], // Clase CSS para el estilo de éxito
          });
        });
      },
      (error) => {
        console.error('Error al eliminar la respuesta:', error);
        this.snackBar.open('Error al eliminar la respuesta. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'], // Clase CSS para el estilo de error
        });
      }
    );
  }
}