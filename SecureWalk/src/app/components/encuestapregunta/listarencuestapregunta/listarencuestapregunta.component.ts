import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Añadir ViewChild y AfterViewInit
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { EncuestaPregunta } from '../../../models/encuestapregunta';
import { EncuestapreguntaService } from '../../../services/encuestapregunta.service';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importar MatPaginator
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Importar MatTableDataSource
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar para notificaciones


@Component({
    selector: 'app-listarencuestapregunta',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule, // Mantener si se usa en otro lugar del componente
        RouterLink,
        MatPaginatorModule, // Asegurarse que esté
        MatTableModule, // Asegurarse que esté para MatTableDataSource
    ],
    templateUrl: './listarencuestapregunta.component.html',
    styleUrl: './listarencuestapregunta.component.css'
})
export class ListarencuestapreguntaComponent implements OnInit, AfterViewInit { // Implementar AfterViewInit

  // dataSource: Usaremos MatTableDataSource para gestionar los datos y la paginación
  dataSource: MatTableDataSource<EncuestaPregunta> = new MatTableDataSource();

  // Referencia al paginador en el HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private epS: EncuestapreguntaService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) { }

  ngOnInit(): void {
    // Suscribirse a la lista inicial de EncuestaPregunta
    this.epS.list().subscribe((data) => {
      this.dataSource.data = data; // Asignar los datos al dataSource
    });

    // Suscribirse a los cambios en la lista (ej. después de una eliminación o adición)
    this.epS.getList().subscribe((data) => {
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
    this.epS.deleteS(id).subscribe(
      () => {
        this.epS.list().subscribe((dataList) => {
          this.epS.setList(dataList); // Actualiza la lista en el servicio, lo que a su vez actualiza el dataSource
          this.snackBar.open('Relación eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        });
      },
      (error) => {
        console.error('Error al eliminar la relación:', error);
        this.snackBar.open('Error al eliminar la relación. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    );
  }
}