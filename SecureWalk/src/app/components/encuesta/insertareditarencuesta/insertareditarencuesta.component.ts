import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, // Importar AbstractControl para el validador de fecha
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors, // Importar ValidationErrors
  Validators,
} from '@angular/forms';
import { Encuesta } from '../../../models/encuesta';
import { EncuestaService } from '../../../services/encuesta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Importar MatIconModule (para el datepicker toggle)
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar

@Component({
  selector: 'app-insertareditarencuesta',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
    NgIf,
    MatButtonModule, // Añadir MatButtonModule
    MatIconModule, // Añadir MatIconModule
  ],
  templateUrl: './insertareditarencuesta.component.html',
  styleUrl: './insertareditarencuesta.component.css'
})
export class InsertareditarencuestaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  encuesta: Encuesta = new Encuesta();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private eS: EncuestaService,
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
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaCreacion: ['', [Validators.required, this.fechaNoPasadaValidator]], // Añadir validador de fecha
    });
  }

  // Validador para asegurar que la fecha no sea pasada
  fechaNoPasadaValidator(control: AbstractControl): ValidationErrors | null {
    const valor = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Quita horas para comparar solo fecha

    return valor < hoy ? { fechaPasada: true } : null;
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor, completa todos los campos requeridos y corrige los errores.', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'] // Clase para estilos de error
      });
      return;
    }

    this.encuesta.idEncuesta = this.form.value.codigo;
    this.encuesta.nombreEncuesta = this.form.value.nombre;
    this.encuesta.descripcionEncuesta = this.form.value.descripcion;
    this.encuesta.fechaCreacionEncuesta = this.form.value.fechaCreacion;

    if (this.edicion) {
      this.eS.update(this.encuesta).subscribe(data => {
        this.eS.list().subscribe(dataList => {
          this.eS.setList(dataList);
          this.router.navigate(['encuestas']);
          this.snackBar.open('Encuesta actualizada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'] // Clase para estilos de éxito
          });
        });
      }, error => {
        this.snackBar.open('Error al actualizar la encuesta. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      });
    } else {
      this.eS.insert(this.encuesta).subscribe((data) => {
        this.eS.list().subscribe((dataList) => {
          this.eS.setList(dataList);
          this.router.navigate(['encuestas']);
          this.snackBar.open('Encuesta registrada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'] // Clase para estilos de éxito
          });
        });
      }, error => {
        this.snackBar.open('Error al registrar la encuesta. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['encuestas']);
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idEncuesta,
          descripcion: data.descripcionEncuesta,
          nombre: data.nombreEncuesta,
          fechaCreacion: data.fechaCreacionEncuesta,
        });
      });
    }
  }
}