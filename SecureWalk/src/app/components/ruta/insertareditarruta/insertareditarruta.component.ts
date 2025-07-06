import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Ruta } from '../../../models/ruta';
import { Zona } from '../../../models/zona';
import { RutaService } from '../../../services/ruta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ZonaService } from '../../../services/zona.service';
import { MatTimepickerModule } from '@angular/material/timepicker'; // <--- NEW: Import MatTimepickerModule
import { MatSnackBar } from '@angular/material/snack-bar'; // <--- NEW: Import MatSnackBar
import { MatSnackBarModule } from '@angular/material/snack-bar'; // <--- NEW: Import MatSnackBarModule

@Component({
  selector: 'app-insertareditarruta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatTimepickerModule, // <--- NEW: Add MatTimepickerModule
    MatSnackBarModule // <--- NEW: Add MatSnackBarModule
  ],
  templateUrl: './insertareditarruta.component.html',
  styleUrl: './insertareditarruta.component.css'
})
export class InsertareditarrutaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ruta: Ruta = new Ruta();

  id: number = 0;
  edicion: boolean = false;

  listaZonas: Zona[] = [];
  seguridadd: { value: string; viewValue: string }[] = [
    { value: 'Alta', viewValue: 'Alta' },
    { value: 'Media', viewValue: 'Media' },
    { value: 'Baja', viewValue: 'Baja' },
  ];

  constructor(
    private rS: RutaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private zS: ZonaService, // Renamed 'uS' to 'zS' for ZonaService for clarity
    private snackBar: MatSnackBar // <--- NEW: Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      seguridad: ['', Validators.required],
      zona: ['', Validators.required],
    });

    this.zS.list().subscribe((data) => { // Using zS
      this.listaZonas = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.ruta.idRuta = this.form.value.codigo;

      // Ensure the 'zona' is assigned as an object with 'idZona'
      // The MatSelect will provide the 'idZona' in form.value.zona
      this.ruta.zona = { idZona: this.form.value.zona } as Zona; // Cast to Zona to match type

      this.ruta.nivelSeguridad = this.form.value.seguridad;

      // Get the Date objects from the form controls
      const horaInicioDate: Date = this.form.value.horaInicio;
      const horaFinDate: Date = this.form.value.horaFin;

      // Format the Date objects to "HH:mm" strings for LocalTime backend
      this.ruta.horaInicio = horaInicioDate ? this.formatTime(horaInicioDate) : null;
      this.ruta.horaFin = horaFinDate ? this.formatTime(horaFinDate) : null;

      if (this.edicion) {
        // Actualizar
        this.rS.update(this.ruta).subscribe({
          next: () => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data);
            });
            this.showSuccessMessage('Ruta actualizada exitosamente');
            this.router.navigate(['rutas']);
          },
          error: (error) => {
            console.error('Error al actualizar ruta:', error);
            this.showErrorMessage('Error al actualizar la ruta.');
          }
        });
      } else {
        // INSERTAR
        this.rS.insert(this.ruta).subscribe({
          next: () => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data);
            });
            this.showSuccessMessage('Ruta registrada exitosamente');
            this.router.navigate(['rutas']);
          },
          error: (error) => {
            console.error('Error al registrar ruta:', error);
            this.showErrorMessage('Error al registrar la ruta.');
          }
        });
      }
    } else {
      this.showErrorMessage('Por favor, complete todos los campos requeridos.');
    }
  }

  cancelar() {
    this.router.navigate(['rutas']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form.patchValue({ // Use patchValue instead of new FormGroup for simpler updates
          codigo: data.idRuta,
          // Convert LocalTime string from backend to Date object for the time picker
          horaInicio: data.horaInicio ? this.parseTime(data.horaInicio) : null,
          horaFin: data.horaFin ? this.parseTime(data.horaFin) : null,
          seguridad: data.nivelSeguridad, // Corrected from data.idRuta
          zona: data.zona.idZona, // Patch with ID, not the name
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
    const date = new Date(); // Use a generic date (today's date, but time part will be set)
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
      panelClass: ['success-snackbar'] // Using remembered color: Green
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'] // Using remembered color: Red
    });
  }
}