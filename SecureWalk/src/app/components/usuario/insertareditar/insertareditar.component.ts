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
  selector: 'app-insertareditar',
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
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarComponent implements OnInit {
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
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar
      this.init();
    });

    this.uS.list().subscribe((usuarios) => {
      this.usernamesRegistrados = usuarios.map((u: Usuario) =>
        u.username.toLowerCase()
      );
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['',[Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$')],],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ ,.\\-#]*$'),],],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      fechaRegistro: ['', [Validators.required, this.fechaNoPasadaValidator]],
      username: ['', [Validators.required, this.usernameDuplicadoValidator()]],
      password: ['', Validators.required],
      enable: ['', Validators.required],
    });
  }
  usernameDuplicadoValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valor = control.value.toLowerCase();
      const existe = this.usernamesRegistrados.includes(valor);
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
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo;
      this.usuario.nombreUsuario = this.form.value.nombre;
      this.usuario.emailUsuario = this.form.value.email;
      this.usuario.telefonoUsuario = this.form.value.telefono;
      this.usuario.direccionUsuario = this.form.value.direccion;
      this.usuario.fechaRegistroUsuario = this.form.value.fechaRegistro;
      this.usuario.username = this.form.value.username;
      this.usuario.password = this.form.value.password;
      this.usuario.enable = this.form.value.enable;

      this.uS.insert(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['usuarios']);
    }
    
  }

  cancelar() {
    this.router.navigate(['usuarios']);
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuario),
          nombre: new FormControl(data.nombreUsuario),
          email: new FormControl(data.emailUsuario),
          direccion: new FormControl(data.direccionUsuario),
          telefono: new FormControl(data.telefonoUsuario),
          fechaRegistro: new FormControl(data.fechaRegistroUsuario),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          enable: new FormControl(data.enable),
        });
      });
    }
  }
}
