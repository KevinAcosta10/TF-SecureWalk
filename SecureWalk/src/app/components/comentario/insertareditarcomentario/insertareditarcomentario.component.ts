import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Comentario } from '../../../models/comentario';
import { Usuario } from '../../../models/usuario';
import { Post } from '../../../models/post';
import { ComentarioService } from '../../../services/comentario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { PostService } from '../../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // <--- NEW: Import MatSnackBar
import { MatSnackBarModule } from '@angular/material/snack-bar'; // <--- NEW: Import MatSnackBarModule
import { MatButtonModule } from '@angular/material/button'; // <--- NEW: Ensure MatButtonModule is imported for buttons

@Component({
  selector: 'app-insertareditarcomentario',
  standalone: true, // <--- NEW: Add standalone if it's a standalone component
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
    NgIf,
    MatSnackBarModule, // <--- NEW: Add MatSnackBarModule
    MatButtonModule // <--- NEW: Add MatButtonModule
  ],
  templateUrl: './insertareditarcomentario.component.html',
  styleUrl: './insertareditarcomentario.component.css'
})
export class InsertareditarcomentarioComponent {
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
    private snackBar: MatSnackBar // <--- NEW: Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      descripcionComentario: ['', Validators.required],
      // These form controls will hold the IDs selected from the mat-select
      idPost: ['', Validators.required], // Renamed from descripcionPost to idPost for clarity
      idUsuario: ['', Validators.required], // Renamed from usuario to idUsuario for clarity
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.pS.list().subscribe((data) => {
      this.listaPost = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.comentario.idComentario = this.form.value.codigo;
      this.comentario.descripcionComentario = this.form.value.descripcionComentario;

      // Correctly assign the Post object with its ID
      // Assuming your backend expects a Post object with at least idPost populated
      this.comentario.post = { idPost: this.form.value.idPost } as Post;

      // Correctly assign the Usuario object with its ID
      // Assuming your backend expects a Usuario object with at least idUsuario populated
      this.comentario.usuario = { idUsuario: this.form.value.idUsuario } as Usuario;

      if (this.edicion) {
        // Actualizar
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
            this.showErrorMessage('Error al actualizar el comentario.');
          }
        });
      } else {
        // INSERTAR
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
            this.showErrorMessage('Error al registrar el comentario.');
          }
        });
      }
    } else {
      this.showErrorMessage('Por favor, complete todos los campos requeridos.');
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
          // Patch with the ID of the Post and Usuario
          idPost: data.post.idPost,
          idUsuario: data.usuario.idUsuario,
        });
      });
    }
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}