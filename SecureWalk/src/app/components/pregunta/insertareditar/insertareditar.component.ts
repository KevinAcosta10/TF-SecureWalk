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
import { MatSnackBar, MatSnackBarModule  } from '@angular/material/snack-bar'; 


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
    MatSnackBarModule
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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      texto: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.pregunta.idPregunta   = this.form.value.codigo;
    this.pregunta.textoPregunta = this.form.value.texto;
    this.pregunta.tipoPregunta  = this.form.value.tipo;

    this.pS.insert(this.pregunta).subscribe({
      next: () => {
        // Mostrar snackbar con el texto de la pregunta
        this.snackBar.open(
          `"${this.form.value.texto}"`,
          'Cerrar',
          { duration: 3000 }
        );
        // Actualizar la lista en el service
        this.pS.list().subscribe(listData => {
          this.pS.setList(listData);
        });
        // Navegar de vuelta al listado
        this.router.navigate(['preguntas']);
      },
      error: err => {
        console.error('Error al guardar pregunta', err);
        this.snackBar.open(
          'Error al guardar pregunta',
          'Cerrar',
          { duration: 3000 }
        );
      }
    });
  }

  cancelar() {
    this.router.navigate(['preguntas']);
  }

  private init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idPregunta),
          texto:  new FormControl(data.textoPregunta, Validators.required),
          tipo:   new FormControl(data.tipoPregunta, Validators.required),
        });
      });
    }
  }
}