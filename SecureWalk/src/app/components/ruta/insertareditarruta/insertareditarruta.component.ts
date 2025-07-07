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
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// ======================================================
// === NEW: Add imports for MatCardModule and MatIconModule ===
// ======================================================
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-insertareditarruta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule, // Keep for potential date needs, though timepicker is dominant here
    MatSelectModule,
    MatButtonModule,
    MatTimepickerModule,
    MatSnackBarModule,
    // ======================================================
    // === NEW: Add MatCardModule and MatIconModule to imports ===
    // ======================================================
    MatCardModule,
    MatIconModule
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
    private zS: ZonaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }], // Disable the code field by default
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      seguridad: ['', Validators.required],
      zona: ['', Validators.required],
    });

    this.zS.list().subscribe((data) => {
      this.listaZonas = data;
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mark all fields as touched to show validation errors
      this.showErrorMessage('Please complete all required fields and correct any errors.');
      return; // Stop execution if the form is invalid
    }

    this.ruta.idRuta = this.edicion ? this.id : 0; // Assign 0 for new insertions

    // Find and assign the complete Zona object
    const selectedZona = this.listaZonas.find(zona => zona.idZona === this.form.value.zona);
    if (selectedZona) {
      this.ruta.zona = selectedZona;
    } else {
      this.showErrorMessage('Selected Zone not found.');
      return;
    }

    this.ruta.nivelSeguridad = this.form.value.seguridad;

    // Get the Date objects from the form controls
    const horaInicioDate: Date = this.form.value.horaInicio;
    const horaFinDate: Date = this.form.value.horaFin;

    // Format the Date objects to "HH:mm" strings for LocalTime backend
    this.ruta.horaInicio = horaInicioDate ? this.formatTime(horaInicioDate) : null;
    this.ruta.horaFin = horaFinDate ? this.formatTime(horaFinDate) : null;

    if (this.edicion) {
      this.rS.update(this.ruta).subscribe({
        next: () => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
          this.showSuccessMessage('Route updated successfully');
          this.router.navigate(['rutas']);
        },
        error: (error) => {
          console.error('Error updating route:', error);
          this.showErrorMessage('Error updating the route. Please try again.');
        }
      });
    } else {
      this.rS.insert(this.ruta).subscribe({
        next: () => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
          this.showSuccessMessage('Route registered successfully');
          this.router.navigate(['rutas']);
        },
        error: (error) => {
          console.error('Error registering route:', error);
          this.showErrorMessage('Error registering the route. Please try again.');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['rutas']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idRuta,
          // Convert LocalTime string from backend to Date object for the time picker
          horaInicio: data.horaInicio ? this.parseTime(data.horaInicio) : null,
          horaFin: data.horaFin ? this.parseTime(data.horaFin) : null,
          seguridad: data.nivelSeguridad,
          zona: data.zona?.idZona || '', // Use optional chaining and fallback
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
      panelClass: ['snackbar-success'] // Using remembered color: Green
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'] // Using remembered color: Red
    });
  }
}