import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Añadir OnInit
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Post } from '../../../models/post';
import { Usuario } from '../../../models/usuario';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
// ======================================================
// === CAMBIOS AQUÍ: Añadir importaciones para replicar el diseño de Usuario ===
// ======================================================
import { MatCardModule } from '@angular/material/card'; // Para usar <mat-card>
import { MatButtonModule } from '@angular/material/button'; // Si no estaba
import { MatIconModule } from '@angular/material/icon'; // Usar MatIconModule en lugar de MatIcon
import { MatSnackBar } from '@angular/material/snack-bar'; // Para notificaciones

@Component({
  selector: 'app-insertareditarpost',
  standalone: true, // Asegurar que sea standalone
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    CommonModule,
    NgIf,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule, // Usar MatIconModule
  ],
  templateUrl: './insertareditarpost.component.html',
  styleUrl: './insertareditarpost.component.css'
})
export class InsertareditarpostComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  post: Post = new Post();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];

  constructor(
    private pS: PostService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
    private snackBar: MatSnackBar, // Inyectar MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }], // Deshabilitar el campo código si es autogenerado
      descripcionPost: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor, completa todos los campos requeridos y corrige los errores.', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'] // Clase para estilos de error
      });
      return;
    }

    this.post.idPost = this.edicion ? this.id : 0; // Usar el ID existente para edición, 0 para inserción
    this.post.descripcionPost = this.form.value.descripcionPost;
    this.post.usuario = new Usuario(); // Asegurar que el objeto usuario exista
    this.post.usuario.idUsuario = this.form.value.usuario;

    if (this.edicion) {
      this.pS.update(this.post).subscribe(
        () => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
          this.router.navigate(['posts']);
          this.snackBar.open('Post actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        },
        (error) => {
          console.error('Error al actualizar el post:', error);
          this.snackBar.open('Error al actualizar el post. Inténtalo de nuevo.', 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      );
    } else {
      this.pS.insert(this.post).subscribe(
        () => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
          this.router.navigate(['posts']);
          this.snackBar.open('Post registrado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        },
        (error) => {
          console.error('Error al registrar el post:', error);
          this.snackBar.open('Error al registrar el post. Inténtalo de nuevo.', 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['posts']);
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idPost,
          descripcionPost: data.descripcionPost,
          usuario: data.usuario.idUsuario,
        });
      });
    }
  }
}