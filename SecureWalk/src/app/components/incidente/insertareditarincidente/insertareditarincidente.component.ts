import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Incidente } from '../../../models/incidente';
import { Usuario } from '../../../models/usuario';
import { Zona } from '../../../models/zona';
import { IncidenteService } from '../../../services/incidente.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ZonaService } from '../../../services/zona.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-insertareditarincidente',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './insertareditarincidente.component.html',
  styleUrl: './insertareditarincidente.component.css',
})
export class InsertareditarincidenteComponent {
  form: FormGroup = new FormGroup({});
  incidente: Incidente = new Incidente();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];
  listaZonas: Zona[] = [];
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Robo', viewValue: 'Robo' },
    { value: 'Secuestro', viewValue: 'Secuestro' },
    { value: 'Asalto', viewValue: 'Asalto' }
  ]
  constructor(
    private iS: IncidenteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
    private zS: ZonaService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''], 
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      zona: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.zS.list().subscribe((data) => {
      this.listaZonas = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.incidente.idIncidente = this.form.value.codigo;
      this.incidente.tipoIncidente = this.form.value.tipo;
      this.incidente.fechaIncidente = this.form.value.fecha;
      this.incidente.descripcionIncidente = this.form.value.descripcion;
      this.incidente.zona.idZona = this.form.value.zona;
      this.incidente.usuario.idUsuario = this.form.value.usuario;

      if (this.edicion) {
        //actualizar
        this.iS.update(this.incidente).subscribe((data) => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      } else {
        //INSERTAR
        this.iS.insert(this.incidente).subscribe((data) => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      }
      this.router.navigate(['incidentes']);
    }
  }

  cancelar() {
    this.router.navigate(['incidentes']);
  }

  init() {
    if (this.edicion) {
      this.iS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idIncidente,
          tipo: data.tipoIncidente,
          fecha: data.fechaIncidente,
          descripcion: data.descripcionIncidente,
          zona: data.zona.idZona,
          usuario: data.usuario.idUsuario,
        });
      });
    }
  }
}
