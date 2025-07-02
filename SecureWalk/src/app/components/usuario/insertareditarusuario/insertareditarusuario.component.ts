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
export class InsertareditarusuarioComponent implements OnInit { // Agrega implements OnInit
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();

  enable: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Sí' },
    { value: false, viewValue: 'No' },
  ];

  id: number = 0;
  edicion: boolean = false;
  usernamesRegistrados: string[] = [];
  hidePassword: boolean = true;

  constructor(
    private uS: UsuariosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Primero, inicializa el formulario con todos sus validadores
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

    // Luego, carga los usernames registrados (esto es independiente de la inicialización del formulario)
    this.uS.list().subscribe((usuarios) => {
      this.usernamesRegistrados = usuarios.map((u: Usuario) =>
        u.username.toLowerCase()
      );
      // **IMPORTANTE**: Si el validador de username depende de usernamesRegistrados,
      // y estos se cargan asíncronamente, necesitas actualizar el validador
      // o el estado del control de username después de que se carguen.
      // Una forma es llamar a updateValueAndValidity() si el formulario ya estaba creado.
      if (this.edicion) { // Si es edición, el username actual no debe ser marcado como duplicado consigo mismo
        this.form.get('username')?.setValidators([Validators.required, this.usernameDuplicadoValidator(this.form.get('username')?.value)]);
      } else {
        this.form.get('username')?.setValidators([Validators.required, this.usernameDuplicadoValidator()]);
      }
      this.form.get('username')?.updateValueAndValidity();
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); // Llama a init DESPUÉS de que el formulario base ya esté configurado
    });
  }

  usernameDuplicadoValidator = (currentUsername?: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valor = control.value.toLowerCase();
      // En modo edición, el username actual no debería contarse como "duplicado" consigo mismo.
      const existe = this.usernamesRegistrados.includes(valor) && (currentUsername ? valor !== currentUsername.toLowerCase() : true);
      return existe ? { usernameDuplicado: true } : null;
    };
  };

  fechaNoPasadaValidator(control: AbstractControl): ValidationErrors | null {
    const valor = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Quita horas para comparar solo fecha

    return valor < hoy ? { fechaPasada: true } : null;
  }

  aceptar() {
    // Si el formulario no está válido, marca todos los controles como 'touched'
    // para que los mensajes de error se muestren.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return; // Detiene la ejecución si el formulario no es válido
    }

    // Tu lógica existente para guardar o actualizar
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
      // Si estás en modo edición y la contraseña no fue modificada,
      // no la envíes o envíala como estaba (dependiendo de tu API).
      // Aquí asumo que si el campo está oculto (edicion = true),
      // no queremos actualizar la contraseña a un valor vacío si no se editó.
      // Podrías tener un campo "cambiarContraseña" o simplemente no incluir
      // el campo password en el `patchValue` si el usuario no lo cambió.
      // Por ahora, tu HTML lo oculta, lo que significa que no se editará.
      // Si la API espera la contraseña siempre, asegúrate de mantener la original
      // o gestionarla adecuadamente.
      this.uS.update(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((dataList) => {
          this.uS.setList(dataList);
        });
      });
    } else {
      //INSERTAR
      this.uS.insert(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((dataList) => {
          this.uS.setList(dataList);
        });
      });
    }
    this.router.navigate(['usuarios']);
  }

  cancelar() {
    this.router.navigate(['usuarios']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        // Usa patchValue para rellenar el formulario existente con los datos
        // Asegúrate de que los nombres de las propiedades coincidan con los `formControlName`
        this.form.patchValue({
          codigo: data.idUsuario,
          nombre: data.nombreUsuario,
          email: data.emailUsuario,
          direccion: data.direccionUsuario,
          telefono: data.telefonoUsuario,
          fechaRegistro: data.fechaRegistroUsuario,
          username: data.username,
          password: data.password, // Podrías querer no cargar la contraseña real por seguridad
          enable: data.enable,
        });

        // Si estás en modo edición, y el campo de contraseña está condicionalmente oculto,
        // quita el validador 'required' si no quieres que sea obligatorio al editar
        // si no se muestra el campo. O maneja su valor de otra forma.
        if (this.edicion) {
            this.form.get('password')?.clearValidators();
            this.form.get('password')?.updateValueAndValidity();
        }
        // También actualiza el validador de username para no considerarse duplicado a sí mismo
        this.form.get('username')?.setValidators([Validators.required, this.usernameDuplicadoValidator(data.username)]);
        this.form.get('username')?.updateValueAndValidity();
      });
    }
  }
}