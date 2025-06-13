import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditar',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
    NgIf,
    MatOption,
    MatSelectModule

  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
    usuario: Usuario = new Usuario();

    enable: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Sí' },
    { value: false, viewValue: 'No' },
  ]
  
    constructor(
      private uS: UsuariosService,
      private router: Router,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        nombreUsuario: ['', Validators.required],
        emailUsuario: ['', Validators.required],
        direccionUsuario: ['', Validators.required],
        telefonoUsuario: ['', Validators.required],
        fechaRegistroUsuario: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        enable: ['', Validators.required]
      });
    }
    aceptar() {
      if (this.form.valid) {
        this.usuario.nombreUsuario = this.form.value.nombreUsuario;
        this.usuario.emailUsuario = this.form.value.emailUsuario;
        this.usuario.telefonoUsuario = this.form.value.telefonoUsuario;
        this.usuario.direccionUsuario =
          this.form.value.direccionUsuario;
        this.usuario.fechaRegistroUsuario = this.form.value.fechaRegistroUsuario
        this.usuario.username = this.form.value.username
        this.usuario.password = this.form.value.password
        this.usuario.enable = this.form.value.enable
  
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
        this.router.navigate(['usuarios']);
      }
    }
}