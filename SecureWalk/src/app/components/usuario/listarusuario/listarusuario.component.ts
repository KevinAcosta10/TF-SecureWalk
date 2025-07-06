import { Component, OnInit, ViewChild } from '@angular/core'; // Importar ViewChild
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importar MatPaginator y MatPaginatorModule
import { MatTableDataSource } from '@angular/material/table'; // Importar MatTableDataSource
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    MatPaginatorModule, // Añadir MatPaginatorModule a imports
  ],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css',
})
export class ListarusuarioComponent implements OnInit {
  // Cambiamos 'usuarios' a 'dataSource' para usar MatTableDataSource
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();

  form: FormGroup;
  notResults: boolean = false;
  usuarioBusqueda: string = '';

  // Referencia al paginador en el HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private uS: UsuariosService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {
    this.form = fb.group({
      usuario: [''],
    });
  }

  ngOnInit(): void {
    // Suscribirse a la lista inicial de usuarios
    this.uS.list().subscribe((data) => {
      this.dataSource.data = data; // Asignar los datos al dataSource
      // El paginador se conectará automáticamente si ya está disponible
      // Si ngOnInit se ejecuta antes que @ViewChild(MatPaginator) esté listo,
      // la asignación en ngAfterViewInit es crucial.
    });

    // Suscribirse a los cambios en la lista (ej. después de una eliminación)
    this.uS.getList().subscribe((data) => {
      this.dataSource.data = data; // Actualizar los datos del dataSource
      // Asegurarse de que el paginador esté conectado si aún no lo está
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage(); // Volver a la primera página si los datos cambian
      }
    });

    // Suscribirse a los cambios en el campo de búsqueda
    this.form.get('usuario')?.valueChanges.subscribe((value) => {
      this.usuarioBusqueda = value;
      this.buscar();
    });
  }

  // ngAfterViewInit es el ciclo de vida donde ViewChild asegura que el paginador está disponible
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.uS.deleteS(id).subscribe(
      (data) => {
        this.uS.list().subscribe((dataList) => {
          this.uS.setList(dataList); // Esto activará la suscripción en getList() y actualizará dataSource
          this.snackBar.open('Usuario eliminado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        });
      },
      (error) => {
        this.snackBar.open('Error al eliminar el usuario. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    );
  }

  buscar() {
    if (this.usuarioBusqueda.trim()) {
      this.uS.searchUser(this.usuarioBusqueda).subscribe((data) => {
        this.dataSource.data = data; // Actualizar dataSource con resultados de búsqueda
        this.notResults = data.length === 0;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage(); // Volver a la primera página de resultados de búsqueda
        }
      });
    } else {
      this.uS.list().subscribe((data) => {
        this.dataSource.data = data; // Volver a mostrar todos los usuarios
        this.notResults = false;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage(); // Volver a la primera página de todos los usuarios
        }
      });
    }
  }
}