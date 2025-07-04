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

@Component({
  selector: 'app-insertareditarcomentario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
    NgIf
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
    private pS: PostService
  ) {}
ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''], 
      descripcionComentario: ['', Validators.required],
      post: ['', Validators.required],
      usuario: ['', Validators.required],
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
      this.comentario.post.descripcionPost = this.form.value.descripcionPost;
      this.comentario.usuario.idUsuario = this.form.value.usuario;

      if (this.edicion) {
        //actualizar
        this.cS.update(this.comentario).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        //INSERTAR
        this.cS.insert(this.comentario).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['comentario']);
    }
  }

  cancelar() {
    this.router.navigate(['comentario']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idComentario,
          descripcionComentario: data.descripcionComentario,
          post: data.post.descripcionPost,
          usuario: data.usuario.idUsuario,
        });
      });
    }
  }
}
