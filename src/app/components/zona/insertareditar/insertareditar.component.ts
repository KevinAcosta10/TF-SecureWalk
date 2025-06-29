import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Zona } from '../../../models/zona';
import { ZonaService } from '../../../services/zona.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  zona: Zona = new Zona();

  id: number = 0
  edicion: boolean = false

  constructor(
    private zS: ZonaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    })


    this.form = this.formBuilder.group({
      codigo: [''],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      nombre: ['', Validators.required]
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.zona.idZona = this.form.value.codigo;
      this.zona.nombreZona = this.form.value.nombre;
      this.zona.latitudZona = this.form.value.latitud;
      this.zona.longitudZona = this.form.value.longitud;

      if (this.edicion) {
        //actualizar
        this.zS.update(this.zona).subscribe(data => {
          this.zS.list().subscribe(data => {
            this.zS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.zS.insert(this.zona).subscribe(data => {
          this.zS.list().subscribe(data => {
            this.zS.setList(data)
          })
        })
      }
        this.router.navigate(['zonas'])
      }
    }

    cancelar() {
    this.router.navigate(['zonas']);
  }

  init() {
    if (this.edicion) {
      this.zS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idZona),
          nombre: new FormControl(data.nombreZona),
          latitud: new FormControl(data.latitudZona),
          longitud: new FormControl(data.longitudZona),
        })
      })
    }
  }
}
