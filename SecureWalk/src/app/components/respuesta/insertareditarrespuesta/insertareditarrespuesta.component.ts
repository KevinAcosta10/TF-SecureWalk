import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Respuesta } from '../../../models/respuesta';
import { Usuario } from '../../../models/usuario';
import { EncuestaPregunta } from '../../../models/encuestapregunta';
import { RespuestaService } from '../../../services/respuesta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { EncuestapreguntaService } from '../../../services/encuestapregunta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-insertareditarrespuesta',
  standalone: true,
  providers: [provideNativeDateAdapter()], 
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
    NgIf,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatOptionModule
  ],
  templateUrl: './insertareditarrespuesta.component.html',
  styleUrl: './insertareditarrespuesta.component.css'
})
export class InsertareditarrespuestaComponent implements OnInit { 
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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }], 
      fechaRespuesta: ['', Validators.required],
      textoRespuesta: ['', Validators.required],
      usuario: ['', Validators.required], 
      encuestaPregunta: ['', Validators.required], 
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.epS.list().subscribe((data) => {
      this.listaEncuestaPregunta = data;
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      this.showErrorMessage('Por favor, completa todos los campos requeridos y corrige los errores.');
      return;
    }

    this.respuesta.idRespuesta = this.edicion ? this.id : 0; 

    this.respuesta.usuario = this.form.value.usuario;
    this.respuesta.encuestaPregunta = this.form.value.encuestaPregunta;
    this.respuesta.fechaRespuesta = this.form.value.fechaRespuesta;
    this.respuesta.textoRespuesta = this.form.value.textoRespuesta;


    if (this.edicion) {
      this.rS.update(this.respuesta).subscribe({
        next: () => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
          this.showSuccessMessage('Respuesta actualizada exitosamente');
          this.router.navigate(['respuestas']);
        },
        error: (error) => {
          console.error('Error al actualizar respuesta:', error);
          this.showErrorMessage('Error al actualizar la respuesta. Inténtalo de nuevo.');
        }
      });
    } else {
      this.rS.insert(this.respuesta).subscribe({
        next: () => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
          this.showSuccessMessage('Respuesta registrada exitosamente');
          this.router.navigate(['respuestas']);
        },
        error: (error) => {
          console.error('Error al registrar respuesta:', error);
          this.showErrorMessage('Error al registrar la respuesta. Inténtalo de nuevo.');
        }
      });
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
          usuario: data.usuario || null, 
          encuestaPregunta: data.encuestaPregunta || null, 
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