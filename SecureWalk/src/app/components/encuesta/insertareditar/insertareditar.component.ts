import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Encuesta } from '../../../models/encuesta';
import { EncuestaService } from '../../../services/encuesta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';

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
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  encuesta: Encuesta = new Encuesta();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private eS: EncuestaService,
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

    this.form = this.formBuilder.group({
      codigo: [''], 
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.encuesta.idEncuesta = this.form.value.codigo;
      this.encuesta.nombreEncuesta = this.form.value.nombre;
      this.encuesta.descripcionEncuesta = this.form.value.descripcion;
      this.encuesta.fechaCreacionEncuesta =
        this.form.value.fechaCreacion;

      this.eS.insert(this.encuesta).subscribe((data) => {
        this.eS.list().subscribe((data) => {
          this.eS.setList(data);
        });
      });
      this.router.navigate(['encuestas']);
    }
  }

  cancelar() {
      this.router.navigate(['encuestas']);
    }
    init() {
      if (this.edicion) {
        this.eS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            codigo: new FormControl(data.idEncuesta),
            nombre: new FormControl(data.nombreEncuesta),
            descripcion: new FormControl(data.descripcionEncuesta),  
            fechaCreacion: new FormControl(data.fechaCreacionEncuesta),       
          });
        });
      }
    }
}
