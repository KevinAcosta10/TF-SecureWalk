import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Importar OnInit
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; // Importar MatIconModule
import { MatCardModule } from '@angular/material/card'; // Importar MatCardModule

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioRuta } from '../../../models/usuarioRuta';
import { Usuario } from '../../../models/usuario';
import { Ruta } from '../../../models/ruta';
import { UsuariorutaService } from '../../../services/usuarioruta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { RutaService } from '../../../services/ruta.service'; // Renombrado a rS
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormControl } from '@angular/forms'; // Importar FormControl

@Component({
  selector: 'app-insertareditarusuarioruta',
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
    MatTimepickerModule,
    MatSnackBarModule,
    MatIconModule, // Añadido
    MatCardModule, // Añadido
  ],
  templateUrl: './insertareditarusuarioruta.component.html',
  styleUrl: './insertareditarusuarioruta.component.css',
})
export class InsertareditarusuariorutaComponent implements OnInit {
  // Implementar OnInit
  form: FormGroup = new FormGroup({});
  usuarioruta: UsuarioRuta = new UsuarioRuta();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];
  listaRutas: Ruta[] = [];

  constructor(
    private urS: UsuariorutaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
    private rS: RutaService, // Renombrado de iS a rS para RutaService
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }], // Deshabilitar el campo código por defecto
      usuario: ['', Validators.required],
      zonas: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.rS.list().subscribe((data) => {
      // Usando rS
      this.listaRutas = data;
    });
  }

  aceptar(): void {
    // Asegurar el tipo de retorno
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
      this.showErrorMessage(
        'Por favor, completa todos los campos requeridos y corrige los errores.'
      );
      return;
    }

    this.usuarioruta.idUsuarioRuta = this.edicion ? this.id : 0; // Asignar 0 para nuevas inserciones // Buscar y asignar el objeto Usuario completo

    const selectedUsuario = this.listaUsuarios.find(
      (u) => u.idUsuario === this.form.value.usuario
    );
    if (selectedUsuario) {
      this.usuarioruta.usuario = selectedUsuario;
    } else {
      this.showErrorMessage('Usuario seleccionado no encontrado.');
      return;
    } // Buscar y asignar el objeto Ruta completo

    const selectedRuta = this.listaRutas.find(
      (r) => r.idRuta === this.form.value.zonas
    );
    if (selectedRuta) {
      this.usuarioruta.ruta = selectedRuta;
    } else {
      this.showErrorMessage('Ruta seleccionada no encontrada.');
      return;
    } // Asignar las horas formateadas a la ruta dentro de UsuarioRuta

    const horaInicioDate: Date = this.form.value.horaInicio;
    const horaFinDate: Date = this.form.value.horaFin;

    this.usuarioruta.ruta.horaInicio = horaInicioDate
      ? this.formatTime(horaInicioDate)
      : null;
    this.usuarioruta.ruta.horaFin = horaFinDate
      ? this.formatTime(horaFinDate)
      : null;

    if (this.edicion) {
      this.urS.update(this.usuarioruta).subscribe({
        next: () => {
          this.urS.list().subscribe((data) => {
            this.urS.setList(data);
          });
          this.showSuccessMessage('Ruta de usuario actualizada exitosamente');
          this.router.navigate(['usuarioRutas']);
        },
        error: (err) => {
          console.error('Error al actualizar ruta de usuario:', err);
          this.showErrorMessage(
            'Error al actualizar la ruta de usuario. Inténtalo de nuevo.'
          );
        },
      });
    } else {
      this.urS.insert(this.usuarioruta).subscribe({
        next: () => {
          this.urS.list().subscribe((data) => {
            this.urS.setList(data);
          });
          this.showSuccessMessage('Ruta de usuario registrada exitosamente');
          this.router.navigate(['usuarioRutas']);
        },
        error: (err) => {
          console.error('Error al registrar ruta de usuario:', err);
          this.showErrorMessage(
            'Error al registrar la ruta de usuario. Inténtalo de nuevo.'
          );
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['usuarioRutas']);
  }

  init(): void {
    if (this.edicion) {
      this.urS.listId(this.id).subscribe((data) => {
        // Asegurarse de que data.ruta y data.usuario existan antes de acceder a sus propiedades
        this.form.patchValue({
          codigo: data.idUsuarioRuta,
          usuario: data.usuario?.idUsuario || '', // Usar optional chaining y fallback
          zonas: data.ruta?.idRuta || '', // Usar optional chaining y fallback
          horaInicio: data.ruta?.horaInicio
            ? this.parseTime(data.ruta.horaInicio)
            : null,
          horaFin: data.ruta?.horaFin
            ? this.parseTime(data.ruta.horaFin)
            : null,
        });
      });
    }
  }
  /**
   * Helper function to format a JavaScript Date object into a "HH:mm" string.
   * Adjust to "HH:mm:ss" if your backend LocalTime requires seconds.
   */

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0'); // const seconds = date.getSeconds().toString().padStart(2, '0'); // Uncomment if you need seconds
    return `${hours}:${minutes}`; // or `${hours}:${minutes}:${seconds}`
  }
  /**
   * Helper function to parse a "HH:mm" or "HH:mm:ss" string into a JavaScript Date object.
   * This is used when loading data for editing.
   */

  private parseTime(timeString: string): Date | null {
    if (!timeString) return null;
    const [hours, minutes, seconds = '00'] = timeString.split(':');
    const date = new Date(); // Use a generic date, only time part matters for the picker
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));
    date.setMilliseconds(0);
    return date;
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }
}
