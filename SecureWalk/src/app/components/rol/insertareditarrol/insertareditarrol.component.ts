import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosService } from '../../../services/usuarios.service';
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
    MatButtonModule
  ],
  templateUrl: './insertareditarrol.component.html',
  styleUrl: './insertareditarrol.component.css'
})
export class InsertareditarrolComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();

  id: number = 0;
  edicion: boolean = false;

  listaUsuarios: Usuario[] = []

  nombres: { value: string; viewValue: string }[] = [
    { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' },
    { value: 'POLICIA', viewValue: 'POLICIA' },
    { value: 'USUARIO', viewValue: 'USUARIO' }
  ]

  constructor(
    private rS: RolService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe(data => {
      this.listaUsuarios = data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.rol.idRol = this.form.value.codigo;
      this.rol.nombreRol = this.form.value.nombre;
      this.rol.usuario.idUsuario = this.form.value.usuario;

      if (this.edicion) {
        //actualizar
        this.rS.update(this.rol).subscribe(data => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.rS.insert(this.rol).subscribe(data => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })
      }
      this.router.navigate(['roles'])
    }
  }

  cancelar() {
    this.router.navigate(['roles']);
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRol),
          nombre: new FormControl(data.nombreRol),
          usuario: new FormControl(data.usuario.idUsuario), //deshabilita la edición del campo en específico a la hora de editar
        });
      });
    }
  }
}
