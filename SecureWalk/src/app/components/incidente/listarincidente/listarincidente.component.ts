import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Añadir AfterViewInit y ViewChild
import { Incidente } from '../../../models/incidente';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Importar MatTableDataSource
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IncidenteService } from '../../../services/incidente.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
// import { OwlOptions } from 'ngx-owl-carousel-o'; // Ya no es necesario
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importar MatPaginator
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar para notificaciones

@Component({
    selector: 'app-listarincidente',
    imports: [
        MatTableModule, // Asegúrate de que MatTableModule esté importado para MatTableDataSource
        MatIconModule,
        CommonModule,
        MatCardModule,
        RouterLink,
        MatButtonModule,
        MatPaginatorModule, // Asegúrate de que MatPaginatorModule esté importado
    ],
    templateUrl: './listarincidente.component.html',
    styleUrl: './listarincidente.component.css'
})
export class ListarincidenteComponent implements OnInit, AfterViewInit { // Implementar AfterViewInit

  // dataSource: Usaremos MatTableDataSource para gestionar los datos y la paginación
  dataSource: MatTableDataSource<Incidente> = new MatTableDataSource();

  // Referencia al paginador en el HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // customOptions: OwlOptions; // Ya no es necesario si eliminamos Owl Carousel

  constructor(
    private iS: IncidenteService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) { }

  ngOnInit(): void {
    // Suscribirse a la lista inicial de incidentes
    this.iS.list().subscribe((data) => {
      this.dataSource.data = data; // Asignar los datos al dataSource
    });

    // Suscribirse a los cambios en la lista (ej. después de una eliminación o adición)
    this.iS.getList().subscribe((data) => {
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
    this.iS.deleteS(id).subscribe(
      () => {
        this.iS.list().subscribe((dataList) => {
          this.iS.setList(dataList); // Actualiza la lista en el servicio, lo que a su vez actualiza el dataSource
          this.snackBar.open('Incidente eliminado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        });
      },
      (error) => {
        console.error('Error al eliminar el incidente:', error);
        this.snackBar.open('Error al eliminar el incidente. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    );
  }
}