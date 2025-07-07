import { Component, OnInit } from '@angular/core'; // Importar OnInit
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Incidente } from '../../../models/incidente';
import { Usuario } from '../../../models/usuario';
import { Zona } from '../../../models/zona';
import { IncidenteService } from '../../../services/incidente.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ZonaService } from '../../../services/zona.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { CommonModule, NgIf } from '@angular/common';
// ======================================================
// === CAMBIOS AQUÍ: Añadir importaciones para el nuevo diseño ===
// ======================================================
import { MatCardModule } from '@angular/material/card'; // Para usar <mat-card>
import { MatIconModule } from '@angular/material/icon'; // Para usar <mat-icon>
import { MatSnackBar } from '@angular/material/snack-bar'; // Para notificaciones
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Módulo de MatSnackBar
import { MatButtonModule } from '@angular/material/button'; // Para los botones

@Component({
  selector: 'app-insertareditarincidente',
  standalone: true, // Añadir standalone: true
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
    NgIf,
    // ======================================================
    // === Añadir módulos para replicar el diseño de formularios previos ===
    // ======================================================
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  templateUrl: './insertareditarincidente.component.html',
  styleUrl: './insertareditarincidente.component.css'
})
export class InsertareditarincidenteComponent implements OnInit { // Implementar OnInit
  form: FormGroup = new FormGroup({});
  incidente: Incidente = new Incidente();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];
  listaZonas: Zona[] = [];
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Robo', viewValue: 'Robo' },
    { value: 'Secuestro', viewValue: 'Secuestro' },
    { value: 'Asalto', viewValue: 'Asalto' }
  ]
  constructor(
    private iS: IncidenteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
    private zS: ZonaService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }], // Deshabilitar el campo código
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      zona: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.zS.list().subscribe((data) => {
      this.listaZonas = data;
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
      this.showErrorMessage('Por favor, completa todos los campos requeridos y corrige los errores.');
      return; // Detener la ejecución si el formulario no es válido
    }

    this.incidente.idIncidente = this.edicion ? this.id : 0; // Asignar 0 para nuevas inserciones
    this.incidente.tipoIncidente = this.form.value.tipo;
    this.incidente.fechaIncidente = this.form.value.fecha;
    this.incidente.descripcionIncidente = this.form.value.descripcion;

    // Buscar y asignar el objeto Zona completo
    const selectedZona = this.listaZonas.find(z => z.idZona === this.form.value.zona);
    if (selectedZona) {
      this.incidente.zona = selectedZona;
    } else {
      this.showErrorMessage('Zona seleccionada no encontrada.');
      return;
    }

    // Buscar y asignar el objeto Usuario completo
    const selectedUsuario = this.listaUsuarios.find(u => u.idUsuario === this.form.value.usuario);
    if (selectedUsuario) {
      this.incidente.usuario = selectedUsuario;
    } else {
      this.showErrorMessage('Usuario seleccionado no encontrado.');
      return;
    }

    if (this.edicion) {
      this.iS.update(this.incidente).subscribe({
        next: () => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
          this.showSuccessMessage('Incidente actualizado exitosamente');
          this.router.navigate(['incidentes']);
        },
        error: (error) => {
          console.error('Error al actualizar incidente:', error);
          this.showErrorMessage('Error al actualizar el incidente. Inténtalo de nuevo.');
        }
      });
    } else {
      this.iS.insert(this.incidente).subscribe({
        next: () => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
          this.showSuccessMessage('Incidente registrado exitosamente');
          this.router.navigate(['incidentes']);
        },
        error: (error) => {
          console.error('Error al registrar incidente:', error);
          this.showErrorMessage('Error al registrar el incidente. Inténtalo de nuevo.');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['incidentes']);
  }

  init() {
    if (this.edicion) {
      this.iS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idIncidente,
          tipo: data.tipoIncidente,
          fecha: data.fechaIncidente,
          descripcion: data.descripcionIncidente,
          zona: data.zona?.idZona || '', // Usar optional chaining y fallback
          usuario: data.usuario?.idUsuario || '', // Usar optional chaining y fallback
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