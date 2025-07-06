import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Respuesta } from '../../../models/respuesta';
import { EncuestaPregunta } from '../../../models/encuestapregunta';
import { Usuario } from '../../../models/usuario';
import { RespuestaService } from '../../../services/respuesta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { EncuestapreguntaService } from '../../../services/encuestapregunta.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-insertareditarrespuesta',
  standalone: true,
  imports: [MatFormFieldModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatSelectModule,
      MatFormFieldModule,
      MatNativeDateModule,
      CommonModule,
      MatInputModule,
      NgIf],
  templateUrl: './insertareditarrespuesta.component.html',
  styleUrl: './insertareditarrespuesta.component.css'
})
export class InsertareditarrespuestaComponent {
form: FormGroup = new FormGroup({});
  respuesta: Respuesta = new Respuesta();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];
  listaEncuestaPregunta: EncuestaPregunta[] = [];

  constructor(
    private rS: RespuestaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
    private epS: EncuestapreguntaService,
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
      fechaRespuesta: ['', Validators.required],
      textoRespuesta: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.epS.list().subscribe((data) => {
      this.listaEncuestaPregunta = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.respuesta.idRespuesta = this.form.value.codigo;
      this.respuesta.fechaRespuesta = this.form.value.fechaRespuesta;
      this.respuesta.textoRespuesta = this.form.value.textoRespuesta;

      if (this.edicion) {
        //actualizar
        this.rS.update(this.respuesta).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        //INSERTAR
        this.rS.insert(this.respuesta).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['respuestas']);
    }
  }

  cancelar() {
    this.router.navigate(['respuestas']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idRespuesta,
          fechaRespuesta: data.fechaRespuesta,
          textoRespuesta: data.textoRespuesta,
          
        });
      });
    }
  }
}
