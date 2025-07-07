import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Asegurarse de importar OnInit
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Se mantiene aunque no se use directamente, por si el patrón lo requiere
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; // Nueva importación para iconos
import { MatCardModule } from '@angular/material/card'; // Nueva importación para la tarjeta
import { Comentario } from '../../../models/comentario';
import { Usuario } from '../../../models/usuario';
import { Post } from '../../../models/post';
import { ComentarioService } from '../../../services/comentario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { PostService } from '../../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarcomentario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
    NgIf,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule, 
    MatCardModule 
  ],
  templateUrl: './insertareditarcomentario.component.html',
  styleUrl: './insertareditarcomentario.component.css'
})
export class InsertareditarcomentarioComponent implements OnInit { // Implementar OnInit
  form: FormGroup = new FormGroup({});
  comentario: Comentario = new Comentario();
  id: number = 0;
  edicion: boolean = false;
  listaPost: Post[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private cS: ComentarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
    private pS: PostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }], // Deshabilitar el campo código por defecto
      descripcionComentario: ['', Validators.required],
      idPost: ['', Validators.required],
      idUsuario: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.pS.list().subscribe((data) => {
      this.listaPost = data;
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
      this.showErrorMessage('Por favor, completa todos los campos requeridos y corrige los errores.');
      return;
    }

    this.comentario.idComentario = this.edicion ? this.id : 0; // Asignar 0 para nuevas inserciones
    this.comentario.descripcionComentario = this.form.value.descripcionComentario;

    // Buscar y asignar el objeto Post completo
    const selectedPost = this.listaPost.find(post => post.idPost === this.form.value.idPost);
    if (selectedPost) {
      this.comentario.post = selectedPost;
    } else {
      this.showErrorMessage('Post seleccionado no encontrado.');
      return;
    }

    // Buscar y asignar el objeto Usuario completo
    const selectedUsuario = this.listaUsuarios.find(usuario => usuario.idUsuario === this.form.value.idUsuario);
    if (selectedUsuario) {
      this.comentario.usuario = selectedUsuario;
    } else {
      this.showErrorMessage('Usuario seleccionado no encontrado.');
      return;
    }

    if (this.edicion) {
      this.cS.update(this.comentario).subscribe({
        next: () => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
          this.showSuccessMessage('Comentario actualizado exitosamente');
          this.router.navigate(['comentarios']);
        },
        error: (error) => {
          console.error('Error al actualizar comentario:', error);
          this.showErrorMessage('Error al actualizar el comentario. Inténtalo de nuevo.');
        }
      });
    } else {
      this.cS.insert(this.comentario).subscribe({
        next: () => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
          this.showSuccessMessage('Comentario registrado exitosamente');
          this.router.navigate(['comentarios']);
        },
        error: (error) => {
          console.error('Error al registrar comentario:', error);
          this.showErrorMessage('Error al registrar el comentario. Inténtalo de nuevo.');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['comentarios']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idComentario,
          descripcionComentario: data.descripcionComentario,
          idPost: data.post?.idPost || '', // Usar optional chaining y fallback
          idUsuario: data.usuario?.idUsuario || '', // Usar optional chaining y fallback
        });
      });
    }
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'] // Asegúrate de que esta clase esté definida en tu CSS
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'] // Asegúrate de que esta clase esté definida en tu CSS
    });
  }
}