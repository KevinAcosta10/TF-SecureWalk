import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Aunque no se use, se mantiene si es un patrón
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatCardModule } from '@angular/material/card'; // Para usar <mat-card>
import { MatIconModule } from '@angular/material/icon'; // Para usar <mat-icon>
import { MatSnackBar } from '@angular/material/snack-bar'; // Para notificaciones

@Component({
  selector: 'app-insertareditarrol',
  standalone: true, 
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule, 
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './insertareditarrol.component.html',
  styleUrl: './insertareditarrol.component.css'
})
export class InsertareditarrolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();

  id: number = 0;
  edicion: boolean = false;

  listaUsuarios: Usuario[] = []

  nombres: { value: string; viewValue: string }[] = [
    { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' },
    { value: 'POLICIA', viewValue: 'POLICIA' },
    { value: 'CLIENTE', viewValue: 'CLIENTE' }
  ]

  constructor(
    private rS: RolService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }], 
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe(data => {
      this.listaUsuarios = data
    })
  }

  aceptar() {
    if (this.form.invalid) { 
      this.form.markAllAsTouched(); 
      this.snackBar.open('Por favor, completa todos los campos requeridos y corrige los errores.', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return; 
    }

    this.rol.idRol = this.edicion ? this.id : 0; 
    this.rol.nombreRol = this.form.value.nombre;
    this.rol.usuario = new Usuario(); // Asegurar que el objeto usuario exista
    this.rol.usuario.idUsuario = this.form.value.usuario;

    if (this.edicion) {
      this.rS.update(this.rol).subscribe(
        () => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data);
          });
          this.router.navigate(['roles']);
          this.snackBar.open('Rol actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        },
        (error) => {
          console.error('Error al actualizar el rol:', error);
          this.snackBar.open('Error al actualizar el rol. Inténtalo de nuevo.', 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      );
    } else {
      this.rS.insert(this.rol).subscribe(
        () => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data);
          });
          this.router.navigate(['roles']);
          this.snackBar.open('Rol registrado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        },
        (error) => {
          console.error('Error al registrar el rol:', error);
          this.snackBar.open('Error al registrar el rol. Inténtalo de nuevo.', 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['roles']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form.patchValue({ 
          codigo: data.idRol,
          nombre: data.nombreRol,
          usuario: data.usuario.idUsuario,
        });
      });
    }
  }
}