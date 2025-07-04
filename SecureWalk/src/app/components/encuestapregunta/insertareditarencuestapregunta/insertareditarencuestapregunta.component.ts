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
import { MatIcon } from '@angular/material/icon'; // MatIcon para iconos
import { MatButtonModule } from '@angular/material/button'; // MatButtonModule para botones

// Importa tus modelos de Encuesta y Pregunta
import { Encuesta } from '../../../models/encuesta';
import { Pregunta } from '../../../models/pregunta';

@Component({
  selector: 'app-insertareditarencuestapregunta',
  standalone: true,
  imports: [
    CommonModule, // Necesario para *ngFor, *ngIf
    ReactiveFormsModule, // Necesario para formularios reactivos
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule, // Se mantiene por si se usa en otros contextos o por consistencia de imports
    MatSelectModule, // Para los dropdowns de Encuesta y Pregunta
    MatOption, // Para las opciones dentro de mat-select
    MatIcon, // Para los iconos
    MatButtonModule, // Para los botones
    NgIf, // Para *ngIf
  ],
  templateUrl: './insertareditarencuestapregunta.component.html',
  styleUrl: './insertareditarencuestapregunta.component.css',
})
export class InsertareditarencuestapreguntaComponent implements OnInit {
  // ¡Añade implements OnInit!
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
    // 1. Inicializa el formulario con sus controles y validadores
    // Los nombres de los controles deben coincidir con los formControlName en el HTML
    this.form = this.formBuilder.group({
      codigo: [''], // ID de la relación EncuestaPregunta (oculto en HTML)
      encuesta: ['', Validators.required], // ID de la encuesta seleccionada
      pregunta: ['', Validators.required], // ID de la pregunta seleccionada
    });

    // 2. Carga las listas para los dropdowns
    this.eS.list().subscribe((data) => {
      // Asumiendo que eS.list() devuelve List<Encuesta>
      this.listaEncuestas = data;
    });
    this.pS.list().subscribe((data) => {
      // Asumiendo que pS.list() devuelve List<Pregunta>
      this.listaPreguntas = data;
    });

    // 3. Obtiene el ID de la ruta para determinar si es edición
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initFormForEdit(); // Llama a la función para inicializar en modo edición
    });
  }

  /**
   * Maneja el envío del formulario (aceptar).
   */
  aceptar(): void {
    // Si el formulario no es válido, marca todos los controles como 'touched'
    // para mostrar los mensajes de error y detiene la ejecución.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open(
        'Por favor, corrige los errores del formulario.',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'], // Clase CSS para estilizar el snackbar de error
        }
      );
      return;
    }

    // Mapea los valores del formulario a la instancia de EncuestaPregunta
    // ¡IMPORTANTE! Necesitas crear instancias de Encuesta y Pregunta y asignar solo sus IDs
    // Tu backend esperará objetos completos o solo IDs, dependiendo de cómo manejes las relaciones.
    // Aquí, asumimos que tu backend puede recibir objetos de Encuesta y Pregunta con solo el ID seteado.
    this.encuestapregunta.idEncuestaPregunta = this.form.value.codigo;

    // Crea instancias de Encuesta y Pregunta y asigna el ID seleccionado del dropdown
    this.encuestapregunta.encuesta = new Encuesta();
    this.encuestapregunta.encuesta.idEncuesta = this.form.value.encuesta; // Asigna el ID de la encuesta seleccionada

    this.encuestapregunta.pregunta = new Pregunta();
    this.encuestapregunta.pregunta.idPregunta = this.form.value.pregunta; // Asigna el ID de la pregunta seleccionada

    if (this.edicion) {
      // Actualizar la relación EncuestaPregunta
      this.epS.update(this.encuestapregunta).subscribe({
        next: () => {
          this.epS.list().subscribe((dataList) => {
            this.epS.setList(dataList); // Actualiza la lista en el servicio
            this.snackBar.open('Relación actualizada exitosamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });
            this.router.navigate(['encuestasPreguntas']); // Navega a la lista de relaciones
          });
        },
      });
    } else {
      // Insertar nueva relación EncuestaPregunta
      this.epS.insert(this.encuestapregunta).subscribe({
        next: () => {
          this.epS.list().subscribe((dataList) => {
            this.epS.setList(dataList); // Actualiza la lista en el servicio
            this.snackBar.open('Relación registrada exitosamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });
            this.router.navigate(['encuestasPreguntas']); // Navega a la lista de relaciones
          });
        },
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
          encuesta: data.encuesta?.idEncuesta, // Asigna el ID de la encuesta
          pregunta: data.pregunta?.idPregunta, // Asigna el ID de la pregunta
        });
      });
    }
  }
}
