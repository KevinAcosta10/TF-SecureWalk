import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Encuesta } from '../../../models/encuesta';
import { EncuestaService } from '../../../services/encuesta.service';
import { Router } from '@angular/router';
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

  constructor(
    private eS: EncuestaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreEncuesta: ['', Validators.required],
      descripcionEncuesta: ['', Validators.required],
      fechaCreacionEncuesta: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.encuesta.nombreEncuesta = this.form.value.nombreEncuesta;
      this.encuesta.descripcionEncuesta = this.form.value.descripcionEncuesta;
      this.encuesta.fechaCreacionEncuesta =
        this.form.value.fechaCreacionEncuesta;

      this.eS.insert(this.encuesta).subscribe((data) => {
        this.eS.list().subscribe((data) => {
          this.eS.setList(data);
        });
      });
      this.router.navigate(['encuestas']);
    }
  }
}
