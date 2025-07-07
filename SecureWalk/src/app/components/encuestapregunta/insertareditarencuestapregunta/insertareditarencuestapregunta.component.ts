// src/app/components/insertareditarencuestapregunta/insertareditarencuestapregunta.component.ts
import { Component, OnInit } from '@angular/core'; // Importa OnInit
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, // Necesario para formularios reactivos
  Validators,
} from '@angular/forms';
import { EncuestaPregunta } from '../../../models/encuestapregunta'; // Asegúrate de que la ruta sea correcta
import { EncuestapreguntaService } from '../../../services/encuestapregunta.service'; // Asegúrate de que la ruta sea correcta
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EncuestaService } from '../../../services/encuesta.service'; // Servicio para listar encuestas
import { PreguntaService } from '../../../services/pregunta.service'; // Servicio para listar preguntas
import { MatSnackBar } from '@angular/material/snack-bar'; // Para notificaciones

// Importaciones de Angular Material
import { CommonModule, NgIf } from '@angular/common'; // CommonModule para *ngFor, *ngIf
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption } from '@angular/material/core'; // MatOption para mat-select
import { MatDatepickerModule } from '@angular/material/datepicker'; // Aunque no se usa directamente en este HTML, se mantiene si es un import general
import { MatSelectModule } from '@angular/material/select'; // MatSelectModule para mat-select
import { MatIconModule } from '@angular/material/icon'; // MatIconModule para iconos
import { MatButtonModule } from '@angular/material/button'; // MatButtonModule para botones
import { MatCardModule } from '@angular/material/card'; // MatCardModule para la tarjeta

// Importa tus modelos de Encuesta y Pregunta
import { Encuesta } from '../../../models/encuesta';
import { Pregunta } from '../../../models/pregunta';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Asegurarse de que MatSnackBarModule esté importado

@Component({
  selector: 'app-insertareditarencuestapregunta',
  standalone: true, // Asegurar que sea standalone
  imports: [
    CommonModule, // Necesario para *ngFor, *ngIf
    ReactiveFormsModule, // Necesario para formularios reactivos
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule, // Se mantiene por si se usa en otros contextos o por consistencia de imports
    MatSelectModule, // Para los dropdowns de Encuesta y Pregunta
    MatOption, // Para las opciones dentro de mat-select
    MatIconModule, // Para los iconos
    MatButtonModule, // Para los botones
    NgIf, // Para *ngIf
    MatSnackBarModule, // Añadido
    MatCardModule // Añadido
  ],
  templateUrl: './insertareditarencuestapregunta.component.html',
  styleUrl: './insertareditarencuestapregunta.component.css'
})
export class InsertareditarencuestapreguntaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  encuestapregunta: EncuestaPregunta = new EncuestaPregunta();
  id: number = 0; // ID de la relación EncuestaPregunta para edición
  edicion: boolean = false; // Bandera para modo edición

  listaEncuestas: Encuesta[] = []; // Lista para el dropdown de encuestas
  listaPreguntas: Pregunta[] = []; // Lista para el dropdown de preguntas

  constructor(
    private epS: EncuestapreguntaService, // Servicio de EncuestaPregunta
    private router: Router, // Para navegación
    private formBuilder: FormBuilder, // Para construir formularios reactivos
    private route: ActivatedRoute, // Para obtener parámetros de la ruta
    private eS: EncuestaService, // Servicio de Encuesta
    private pS: PreguntaService, // Servicio de Pregunta
    private snackBar: MatSnackBar // Para notificaciones
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }], // Deshabilitar el campo código por defecto
      encuesta: ['', Validators.required],
      pregunta: ['', Validators.required],
    });

    // Carga las listas para los dropdowns
    this.eS.list().subscribe((data) => {
      this.listaEncuestas = data;
    });
    this.pS.list().subscribe((data) => {
      this.listaPreguntas = data;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initFormForEdit(); // Llama a la función para inicializar en modo edición
    });
  }

  aceptar(): void {
    // Si el formulario no es válido, marca todos los controles como 'touched'
    // para mostrar los mensajes de error y detiene la ejecución.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showErrorMessage('Por favor, completa todos los campos requeridos y corrige los errores.');
      return;
    }

    // Mapea los valores del formulario a la instancia de EncuestaPregunta
    this.encuestapregunta.idEncuestaPregunta = this.edicion ? this.id : 0; // Asignar 0 para nuevas inserciones

    // Buscar y asignar el objeto Encuesta completo
    const selectedEncuesta = this.listaEncuestas.find(enc => enc.idEncuesta === this.form.value.encuesta);
    if (selectedEncuesta) {
      this.encuestapregunta.encuesta = selectedEncuesta;
    } else {
      this.showErrorMessage('Encuesta seleccionada no encontrada.');
      return;
    }

    // Buscar y asignar el objeto Pregunta completo
    const selectedPregunta = this.listaPreguntas.find(preg => preg.idPregunta === this.form.value.pregunta);
    if (selectedPregunta) {
      this.encuestapregunta.pregunta = selectedPregunta;
    } else {
      this.showErrorMessage('Pregunta seleccionada no encontrada.');
      return;
    }


    if (this.edicion) {
      // Actualizar la relación EncuestaPregunta
      this.epS.update(this.encuestapregunta).subscribe({
        next: () => {
          this.epS.list().subscribe((dataList) => {
            this.epS.setList(dataList); // Actualiza la lista en el servicio
          });
          this.showSuccessMessage('Relación actualizada exitosamente');
          this.router.navigate(['encuestasPreguntas']); // Navega a la lista de relaciones
        },
        error: (error) => {
          console.error('Error al actualizar relación:', error);
          this.showErrorMessage('Error al actualizar la relación. Inténtalo de nuevo.');
        }
      });
    } else {
      // Insertar nueva relación EncuestaPregunta
      this.epS.insert(this.encuestapregunta).subscribe({
        next: () => {
          this.epS.list().subscribe((dataList) => {
            this.epS.setList(dataList); // Actualiza la lista en el servicio
          });
          this.showSuccessMessage('Relación registrada exitosamente');
          this.router.navigate(['encuestasPreguntas']); // Navega a la lista de relaciones
        },
        error: (error) => {
          console.error('Error al registrar relación:', error);
          this.showErrorMessage('Error al registrar la relación. Inténtalo de nuevo.');
        }
      });
    }
  }

  /**
   * Maneja la acción de cancelar y redirige a la lista de relaciones.
   */
  cancelar(): void {
    this.router.navigate(['encuestasPreguntas']);
  }

  /**
   * Inicializa el formulario con los datos de la relación EncuestaPregunta para edición.
   */
  initFormForEdit(): void {
    if (this.edicion) {
      this.epS.listId(this.id).subscribe((data) => {
        // Rellena el formulario con los IDs de las entidades relacionadas y el orden
        this.form.patchValue({
          codigo: data.idEncuestaPregunta,
          encuesta: data.encuesta?.idEncuesta || '', // Asigna el ID de la encuesta
          pregunta: data.pregunta?.idPregunta || '', // Asigna el ID de la pregunta
        });
      });
    }
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }
}