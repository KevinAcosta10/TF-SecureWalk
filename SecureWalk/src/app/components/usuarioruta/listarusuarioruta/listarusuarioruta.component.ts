import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Añadir ViewChild y AfterViewInit
import { UsuarioRuta } from '../../../models/usuarioruta';
// import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'; // Ya no necesario
import { UsuariorutaService } from '../../../services/usuarioruta.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importar MatPaginator
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Importar MatTableDataSource
import { MatButtonModule } from '@angular/material/button'; // Asegurar MatButtonModule
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar para notificaciones

@Component({
  selector: 'app-listarusuarioruta',
  standalone: true,
  imports: [
    // CarouselModule, // Ya no necesario
    MatCardModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule, // Asegurar que esté
    MatTableModule, // Asegurar que esté para MatTableDataSource
    MatButtonModule, // Asegurar que esté
  ],
  templateUrl: './listarusuarioruta.component.html',
  styleUrl: './listarusuarioruta.component.css',
})
export class ListarusuariorutaComponent implements OnInit, AfterViewInit { // Implementar AfterViewInit

  // dataSource: Usaremos MatTableDataSource para gestionar los datos y la paginación
  dataSource: MatTableDataSource<UsuarioRuta> = new MatTableDataSource();

  // Referencia al paginador en el HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // customOptions: OwlOptions; // Ya no es necesario

  constructor(
    private urS: UsuariorutaService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) { }

  ngOnInit(): void {
    // Suscribirse a la lista inicial de UsuarioRuta
    this.urS.list().subscribe((data) => {
      this.dataSource.data = data; // Asignar los datos al dataSource
    });

    // Suscribirse a los cambios en la lista (ej. después de una eliminación o adición)
    this.urS.getList().subscribe((data) => {
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
    this.urS.deleteS(id).subscribe(
      () => {
        this.urS.list().subscribe((dataList) => {
          this.urS.setList(dataList); // Actualiza la lista en el servicio, lo que a su vez actualiza el dataSource
          this.snackBar.open('Relación Usuario-Ruta eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        });
      },
      (error) => {
        console.error('Error al eliminar la relación Usuario-Ruta:', error);
        this.snackBar.open('Error al eliminar la relación Usuario-Ruta. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    );
  }
}