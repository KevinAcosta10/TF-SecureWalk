import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ruta } from '../../../models/ruta';
import { Zona } from '../../../models/zona';
import { RutaService } from '../../../services/ruta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ZonaService } from '../../../services/zona.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-insertareditarruta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './insertareditarruta.component.html',
  styleUrl: './insertareditarruta.component.css'
})
export class InsertareditarrutaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  ruta: Ruta = new Ruta();

  id: number = 0;
  edicion: boolean = false;

  listaZonas: Zona[] = []

  constructor(
    private rS: RutaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: ZonaService
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
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      seguridad: ['', Validators.required],
      zona: ['', Validators.required]
    });
    this.uS.list().subscribe(data => {
      this.listaZonas = data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.ruta.idRuta = this.form.value.codigo;
      this.ruta.horaInicio = this.form.value.horaInicio;
      this.ruta.horaFin = this.form.value.horaFin;
      this.ruta.nivelSeguridad = this.form.value.seguridad;
      this.ruta.zona = this.form.value.zona;

      if (this.edicion) {
        //actualizar
        this.rS.update(this.ruta).subscribe(data => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.rS.insert(this.ruta).subscribe(data => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })
      }
      this.router.navigate(['rutas'])
    }
  }

  cancelar() {
    this.router.navigate(['rutas']);
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRuta),
          horaInicio: new FormControl(data.horaInicio),
          horaFin: new FormControl(data.horaFin), //deshabilita la edición del campo en específico a la hora de editar
          seguridad: new FormControl(data.idRuta),
          zona: new FormControl(data.zona.nombreZona)
        });
      });
    }
  }
}
