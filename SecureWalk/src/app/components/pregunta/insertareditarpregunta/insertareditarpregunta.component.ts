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
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Importar MatIconModule (aunque no se use directamente, es común en formularios)
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar

@Component({
  selector: 'app-insertareditarpregunta',
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
    MatButtonModule, // Añadir MatButtonModule
    MatIconModule, // Añadir MatIconModule
  ],
  templateUrl: './insertareditarpregunta.component.html',
  styleUrl: './insertareditarpregunta.component.css'
})
export class InsertareditarpreguntaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pregunta: Pregunta = new Pregunta();

  tipoPregunta: { value: String; viewValue: string }[] = [
    { value: 'SI_NO', viewValue: 'Si/No' },
    { value: 'PREGUNTA_ABIERTA', viewValue: 'Pregunta Abierta' },
    { value: 'Muy seguro', viewValue: 'Muy seguro' }, // Manteniendo estos valores como están en tu código
    { value: 'Frecuente', viewValue: 'Frecuente' }, // Manteniendo estos valores como están en tu código
  ];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private pS: PreguntaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) { }

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
      this.snackBar.open('Por favor, completa todos los campos requeridos.', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'] // Clase para estilos de error
      });
      return;
    }

    this.pregunta.idPregunta = this.form.value.codigo;
    this.pregunta.textoPregunta = this.form.value.texto;
    this.pregunta.tipoPregunta = this.form.value.tipo;

    if (this.edicion) {
      this.pS.update(this.pregunta).subscribe(data => {
        this.pS.list().subscribe(dataList => {
          this.pS.setList(dataList);
          this.router.navigate(['preguntas']);
          this.snackBar.open('Pregunta actualizada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'] // Clase para estilos de éxito
          });
        });
      }, error => {
        this.snackBar.open('Error al actualizar la pregunta. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      });
    } else {
      this.pS.insert(this.pregunta).subscribe((data) => {
        this.pS.list().subscribe((dataList) => {
          this.pS.setList(dataList);
          this.router.navigate(['preguntas']);
          this.snackBar.open('Pregunta registrada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'] // Clase para estilos de éxito
          });
        });
      }, error => {
        this.snackBar.open('Error al registrar la pregunta. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['preguntas']);
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form.patchValue({ // Usar patchValue para rellenar el formulario existente
          codigo: data.idPregunta,
          texto: data.textoPregunta,
          tipo: data.tipoPregunta,
        });
      });
    }
  }
}