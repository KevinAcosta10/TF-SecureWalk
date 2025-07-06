import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Añadir ViewChild y AfterViewInit
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { EvaluacionIncidente } from '../../../models/evaluacionincidente';
import { EvaluacionincidenteService } from '../../../services/evaluacionincidente.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importar MatPaginator
import { MatTableDataSource } from '@angular/material/table'; // Importar MatTableDataSource
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar para notificaciones

@Component({
  selector: 'app-listarevaluacionincidente',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarevaluacionincidente.component.html',
  styleUrl: './listarevaluacionincidente.component.css'
})
export class ListarevaluacionincidenteComponent implements OnInit, AfterViewInit { // Implementar AfterViewInit

  // dataSource: Usaremos MatTableDataSource para gestionar los datos y la paginación
  dataSource: MatTableDataSource<EvaluacionIncidente> = new MatTableDataSource();

  // Referencia al paginador en el HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // La propiedad 'enable' parece ser un remanente o no se usa en el listado, la mantengo si es necesaria para otra cosa,
  // pero no afecta directamente la paginación.
  enable: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Aprobado' },
    { value: false, viewValue: 'Desaprobado' },
  ];

  constructor(
    private eiS: EvaluacionincidenteService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {}

  ngOnInit(): void {
    // Suscribirse a la lista inicial de EvaluacionIncidente
    this.eiS.list().subscribe((data) => {
      this.dataSource.data = data; // Asignar los datos al dataSource
    });

    // Suscribirse a los cambios en la lista (ej. después de una eliminación o adición)
    this.eiS.getList().subscribe((data) => {
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
    this.eiS.deleteS(id).subscribe(
      () => {
        this.eiS.list().subscribe((dataList) => {
          this.eiS.setList(dataList); // Actualiza la lista en el servicio, lo que a su vez actualiza el dataSource
          this.snackBar.open('Evaluación de incidente eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        });
      },
      (error) => {
        console.error('Error al eliminar la evaluación de incidente:', error);
        this.snackBar.open('Error al eliminar la evaluación de incidente. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    );
  }
}