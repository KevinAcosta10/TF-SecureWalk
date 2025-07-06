import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Añadir OnInit y AfterViewInit
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'; // Quitar MatTableModule de aquí, solo necesitamos MatTableDataSource
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; // Importar MatCardModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule (si no estaba ya)
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngFor, *ngIf

@Component({
  selector: 'app-listarrol',
  standalone: true, // Asegurar que sea standalone si no está ya
  imports: [
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatCardModule, // Añadir MatCardModule
    MatButtonModule, // Añadir MatButtonModule
    CommonModule // Añadir CommonModule
    // MatTableModule, // ¡Eliminar MatTableModule ya que no usaremos mat-table!
  ],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent implements OnInit, AfterViewInit { // Implementar OnInit y AfterViewInit

  // displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5']; // Ya no es necesario para el formato de tarjetas

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();

  constructor(private rS: RolService) {}

  ngOnInit(): void {
    // Almacenar la lista inicial de roles
    this.rS.list().subscribe((data) => {
      this.dataSource.data = data; // Asignar los datos al dataSource
    });

    // Suscribirse a cambios en la lista (ej. después de una eliminación)
    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data; // Actualizar los datos del dataSource
      // Asegurarse de que el paginador se resetee a la primera página si los datos cambian
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
        this.rS.list().subscribe((data) => {
          this.rS.setList(data); // Esto actualizará el dataSource a través de getList()
          // Opcional: Mostrar una notificación de éxito aquí con MatSnackBar si lo tienes configurado
          // this.snackBar.open('Rol eliminado exitosamente', 'Cerrar', { duration: 3000 });
        });
      },
      (error) => {
        console.error('Error al eliminar el rol:', error);
        // Opcional: Mostrar una notificación de error aquí con MatSnackBar
        // this.snackBar.open('Error al eliminar el rol', 'Cerrar', { duration: 3000, panelClass: ['snackbar-error'] });
      }
    );
  }
}