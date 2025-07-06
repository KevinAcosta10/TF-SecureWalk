import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioRuta } from '../../../models/usuarioRuta';
import { Usuario } from '../../../models/usuario';
import { Ruta } from '../../../models/ruta';
import { UsuariorutaService } from '../../../services/usuarioruta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { RutaService } from '../../../services/ruta.service';
import {MatTimepickerModule} from '@angular/material/timepicker';


@Component({
  selector: 'app-insertareditarusuarioruta',
  standalone:true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
    MatTimepickerModule,
    MatSnackBarModule],
  templateUrl: './insertareditarusuarioruta.component.html',
  styleUrl: './insertareditarusuarioruta.component.css'
})
export class InsertareditarusuariorutaComponent {
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
    private iS: RutaService, // Renamed from iS to rS for better clarity if 'iS' was 'incidenciaService' before
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
      // When using MatSelect, the value of the form control is the `id`
      usuario: ['', Validators.required],
      zonas: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.iS.list().subscribe((data) => { // Using iS as per your code
      this.listaRutas = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.usuarioruta.idUsuarioRuta = this.form.value.codigo;

      // Assign IDs from the form control values for MatSelect
      this.usuarioruta.usuario = { idUsuario: this.form.value.usuario } as Usuario; // Cast to Usuario to match type
      this.usuarioruta.ruta = { idRuta: this.form.value.zonas } as Ruta; // Cast to Ruta to match type

      // Handle horaInicio and horaFin
      const horaInicioDate: Date = this.form.value.horaInicio;
      const horaFinDate: Date = this.form.value.horaFin;

      // Format the Date object to a "HH:mm" or "HH:mm:ss" string for LocalTime
      this.usuarioruta.ruta.horaInicio = horaInicioDate ? this.formatTime(horaInicioDate) : null;
      this.usuarioruta.ruta.horaFin = horaFinDate ? this.formatTime(horaFinDate) : null;

      if (this.edicion) {
        // Actualizar
        this.urS.update(this.usuarioruta).subscribe(() => { // Using arrow function with no data for brevity
          this.urS.list().subscribe((data) => {
            this.urS.setList(data);
          });
          this.showSuccessMessage('Ruta actualizada exitosamente');
        }, (error) => {
          console.error('Error al actualizar ruta:', error);
          this.showErrorMessage('Error al actualizar la ruta.');
        });
      } else {
        // INSERTAR
        this.urS.insert(this.usuarioruta).subscribe(() => { // Using arrow function with no data for brevity
          this.urS.list().subscribe((data) => {
            this.urS.setList(data);
          });
          this.showSuccessMessage('Ruta registrada exitosamente');
        }, (error) => {
          console.error('Error al registrar ruta:', error);
          this.showErrorMessage('Error al registrar la ruta.');
        });
      }
      this.router.navigate(['usuarioRutas']);
    } else {
      this.showErrorMessage('Por favor, complete todos los campos requeridos.');
    }
  }

  cancelar() {
    this.router.navigate(['usuarioRutas']);
  }

  init() {
    if (this.edicion) {
      this.urS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idUsuarioRuta,
          usuario: data.usuario.idUsuario, // Patch with ID, not the name
          zonas: data.ruta.idRuta, // Patch with ID, not the name
          // Convert the LocalTime string from backend back to a Date object for the time picker
          horaInicio: data.ruta.horaInicio ? this.parseTime(data.ruta.horaInicio) : null,
          horaFin: data.ruta.horaFin ? this.parseTime(data.ruta.horaFin) : null
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
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0'); // Uncomment if you need seconds
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
      panelClass: ['success-snackbar'] // Optional: for custom styling
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'] // Optional: for custom styling
    });
  }
}