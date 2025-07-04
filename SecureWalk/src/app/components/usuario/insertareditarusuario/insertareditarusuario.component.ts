import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'; // Asegúrate de que MatSnackBar esté importado

@Component({
  selector: 'app-insertareditarusuario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
    NgIf,
    MatOption,
    MatSelectModule,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './insertareditarusuario.component.html',
  styleUrl: './insertareditarusuario.component.css',
})
export class InsertareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();

  enable: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Sí' },
    { value: false, viewValue: 'No' },
  ];

  id: number = 0;
  edicion: boolean = false;
  usernamesRegistrados: string[] = [];
  hidePassword = true; // Inicializa hidePassword

  constructor(
    private uS: UsuariosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Inyecta MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      direccion: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ ,.\\-#]*$'),
        ],
      ],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      fechaRegistro: ['', [Validators.required, this.fechaNoPasadaValidator]],
      username: ['', [Validators.required, this.usernameDuplicadoValidator()]],
      password: ['', Validators.required],
      enable: ['', Validators.required],
    });

    this.uS.list().subscribe((usuarios) => {
      this.usernamesRegistrados = usuarios.map((u: Usuario) =>
        u.username.toLowerCase()
      );
      if (this.edicion) {
        this.form
          .get('username')
          ?.setValidators([
            Validators.required,
            this.usernameDuplicadoValidator(this.form.get('username')?.value),
          ]);
      } else {
        this.form
          .get('username')
          ?.setValidators([
            Validators.required,
            this.usernameDuplicadoValidator(),
          ]);
      }
      this.form.get('username')?.updateValueAndValidity();
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }

  usernameDuplicadoValidator = (currentUsername?: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valor = control.value.toLowerCase();
      const existe =
        this.usernamesRegistrados.includes(valor) &&
        (currentUsername ? valor !== currentUsername.toLowerCase() : true);
      return existe ? { usernameDuplicado: true } : null;
    };
  };

  fechaNoPasadaValidator(control: AbstractControl): ValidationErrors | null {
    const valor = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

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

    this.usuario.idUsuario = this.form.value.codigo;
    this.usuario.nombreUsuario = this.form.value.nombre;
    this.usuario.emailUsuario = this.form.value.email;
    this.usuario.telefonoUsuario = this.form.value.telefono;
    this.usuario.direccionUsuario = this.form.value.direccion;
    this.usuario.fechaRegistroUsuario = this.form.value.fechaRegistro;
    this.usuario.username = this.form.value.username;
    this.usuario.password = this.form.value.password;
    this.usuario.enable = this.form.value.enable;

    if (this.edicion) {
      this.uS.update(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((dataList) => {
          this.uS.setList(dataList);
        });
        this.router.navigate(['usuarios']);
        this.snackBar.open('Usuario actualizado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'] // Clase para estilos de éxito
        });
      });
    } else {
      this.uS.insert(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((dataList) => {
          this.uS.setList(dataList);
        });
        this.router.navigate(['usuarios']);
        this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'] // Clase para estilos de éxito
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['usuarios']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idUsuario,
          nombre: data.nombreUsuario,
          email: data.emailUsuario,
          direccion: data.direccionUsuario,
          telefono: data.telefonoUsuario,
          fechaRegistro: data.fechaRegistroUsuario,
          username: data.username,
          password: data.password,
          enable: data.enable,
        });

        if (this.edicion) {
          this.form.get('password')?.clearValidators();
          this.form.get('password')?.updateValueAndValidity();
        }
        this.form
          .get('username')
          ?.setValidators([
            Validators.required,
            this.usernameDuplicadoValidator(data.username),
          ]);
        this.form.get('username')?.updateValueAndValidity();
      });
    }
  }
}