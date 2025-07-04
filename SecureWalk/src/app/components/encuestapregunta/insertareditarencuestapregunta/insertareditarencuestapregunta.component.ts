import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncuestaPregunta } from '../../../models/encuestapregunta';
import { Encuesta } from '../../../models/encuesta';
import { Pregunta } from '../../../models/pregunta';
import { EncuestapreguntaService } from '../../../services/encuestapregunta.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { EncuestaService } from '../../../services/encuesta.service';
import { PreguntaService } from '../../../services/pregunta.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarencuestapregunta',
  providers: [provideNativeDateAdapter()],
    imports: [ReactiveFormsModule,
          MatInputModule,
          MatFormFieldModule,
          CommonModule,
          MatSelectModule,
          MatButtonModule],
  templateUrl: './insertareditarencuestapregunta.component.html',
  styleUrl: './insertareditarencuestapregunta.component.css'
})
export class InsertareditarencuestapreguntaComponent {
form: FormGroup = new FormGroup({});
  encuestaPregunta: EncuestaPregunta = new EncuestaPregunta();

  id: number = 0;
  edicion: boolean = false;

  listaEncuesta:Encuesta[]=[]
  listaPregunta:Pregunta[]=[]

  constructor(
    private pS: EncuestapreguntaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eS: EncuestaService,
    private sS:PreguntaService
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
      encuestita: ['', Validators.required],
      preguntita: ['', Validators.required]
    });
    this.eS.list().subscribe(data=>{
      this.listaEncuesta=data
    });
    this.sS.list().subscribe(data=>{
      this.listaPregunta=data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.encuestaPregunta.idEncuestaPregunta = this.form.value.codigo;
      this.encuestaPregunta.encuesta = this.form.value.encuestita;
      this.encuestaPregunta.pregunta = this.form.value.preguntita;
      if (this.edicion) {
        //actualizar
        this.pS.update(this.encuestaPregunta).subscribe(data => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.pS.insert(this.encuestaPregunta).subscribe(data => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data)
          })
        })
      }
      this.router.navigate(['encuestaPregunta'])
    }
  }

  cancelar() {
    this.router.navigate(['encuestaPregunta']);
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idEncuestaPregunta),
          encuestita: new FormControl(data.encuesta),
          preguntita: new FormControl(data.pregunta), //deshabilita la edición del campo en específico a la hora de editar
        });
      });
    }
  }
}
