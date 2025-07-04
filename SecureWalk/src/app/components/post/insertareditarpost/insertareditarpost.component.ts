import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-insertareditarpost',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './insertareditarpost.component.html',
  styleUrl: './insertareditarpost.component.css'
})
export class InsertareditarpostComponent {
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
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      descripcionPost: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.post.idPost = this.form.value.codigo;
      this.post.descripcionPost = this.form.value.descripcionPost;
      this.post.usuario.idUsuario = this.form.value.usuario;

      if (this.edicion) {
        //actualizar
        this.pS.update(this.post).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        //INSERTAR
        this.pS.insert(this.post).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['post']);
    }
  }

  cancelar() {
    this.router.navigate(['post']);
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
