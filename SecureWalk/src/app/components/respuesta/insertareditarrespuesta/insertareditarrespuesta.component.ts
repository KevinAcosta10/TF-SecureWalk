import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Respuesta } from '../../../models/respuesta';
import { EncuestaPregunta } from '../../../models/encuestapregunta';
import { Usuario } from '../../../models/usuario';
import { RespuestaService } from '../../../services/respuesta.service';
import { Router } from 'express';
import { ActivatedRoute, Params } from '@angular/router';
import { EncuestapreguntaService } from '../../../services/encuestapregunta.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-insertareditarrespuesta',
  standalone: true,
  imports: [],
  templateUrl: './insertareditarrespuesta.component.html',
  styleUrl: './insertareditarrespuesta.component.css'
})
export class InsertareditarrespuestaComponent {
form: FormGroup = new FormGroup({});
  respuesta: Respuesta = new Respuesta();

  id: number = 0;
  edicion: boolean = false;

  listaencuestapregunta:EncuestaPregunta[]=[]
  listaUsuario:Usuario[]=[]

  constructor(
    private sS: RespuestaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rS: EncuestapreguntaService,
    private aS:UsuariosService
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
      texto: ['', Validators.required],
      fecha: ['', Validators.required],
      encuesta: ['', Validators.required],
      persona: ['', Validators.required]
    });
    this.rS.list().subscribe(data=>{
      this.listaencuestapregunta=data
    });
    this.aS.list().subscribe(data=>{
      this.listaUsuario=data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.respuesta.idRespuesta = this.form.value.codigo;
      this.respuesta.textoRespuesta = this.form.value.texto;
      this.respuesta.fechaRespuesta = this.form.value.fecha;
      this.respuesta.encuestaPregunta = this.form.value.encuesta;
      this.respuesta.usuario = this.form.value.persona;
      if (this.edicion) {
        //actualizar
        this.sS.update(this.respuesta).subscribe(data => {
          this.sS.list().subscribe(data => {
            this.sS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.sS.insert(this.respuesta).subscribe(data => {
          this.sS.list().subscribe(data => {
            this.sS.setList(data)
          })
        })
      }
      this.router.navigate(['usuarioRuta'])
    }
  }

  cancelar() {
    this.router.navigate(['usuarioRuta']);
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRespuesta),
          texto: new FormControl(data.textoRespuesta),
          fecha: new FormControl(data.fechaRespuesta),
          encuesta: new FormControl(data.encuestaPregunta),
          persona: new FormControl(data.usuario), //deshabilita la edición del campo en específico a la hora de editar
        });
      });
    }
  }
}

