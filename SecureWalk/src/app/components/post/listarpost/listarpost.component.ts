import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Asegurar AfterViewInit
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // ¡IMPORTACIÓN FALTANTE!
import { RouterLink } from '@angular/router';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-listarpost',
    imports: [
        MatIconModule,
        RouterLink,
        MatCardModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule
    ],
    templateUrl: './listarpost.component.html',
    styleUrl: './listarpost.component.css'
})
export class ListarpostComponent implements OnInit, AfterViewInit { // ¡IMPLEMENTA AfterViewInit!

  dataSource: MatTableDataSource<Post> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pS: PostService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.pS.getList().subscribe((data) => {
      this.dataSource.data = data;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  ngAfterViewInit() {
    // Esta asignación es CRUCIAL y solo se garantiza que funcione aquí
    // porque @ViewChild ya ha resuelto la referencia al paginador.
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.pS.deleteS(id).subscribe(
      () => {
        this.pS.list().subscribe((dataList) => {
          this.pS.setList(dataList);
          this.snackBar.open('Post eliminado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        });
      },
      (error) => {
        console.error('Error al eliminar el post:', error);
        this.snackBar.open('Error al eliminar el post. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    );
  }
}