import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pregunta } from '../../../models/pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
    NgIf,
    MatOption,
    MatSelectModule,
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pregunta: Pregunta = new Pregunta();

  tipoPregunta: { value: String; viewValue: string }[] = [
    { value: 'SI_NO', viewValue: 'Si/No' },
    { value: 'PREGUNTA_ABIERTA', viewValue: 'Pregunta Abierta' },
    { value: 'Muy seguro', viewValue: 'Muy seguro' },
    { value: 'Frecuente', viewValue: 'Frecuente' },
  ];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private pS: PreguntaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
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
      tipo: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.pregunta.idPregunta = this.form.value.codigo;
      this.pregunta.textoPregunta = this.form.value.texto;
      this.pregunta.tipoPregunta = this.form.value.tipo;

      this.pS.insert(this.pregunta).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });
      this.router.navigate(['preguntas']);
    }
  }

  cancelar() {
    this.router.navigate(['usuarios']);
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idPregunta),
          texto: new FormControl(data.textoPregunta),
          tipo: new FormControl(data.tipoPregunta),          
        });
      });
    }
  }
}
