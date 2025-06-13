import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Zona } from '../../../models/zona';
import { ZonaService } from '../../../services/zona.service';
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
export class InsertareditarComponent {
  form: FormGroup = new FormGroup({});
      zona: Zona = new Zona();
    
      constructor(
        private zS: ZonaService,
        private router: Router,
        private formBuilder: FormBuilder
      ) {}
    
      ngOnInit(): void {
        this.form = this.formBuilder.group({
          latitudZona: ['', Validators.required],
          longitudZona: ['', Validators.required],
          nombreZona: ['', Validators.required]
        });
      }
      aceptar() {
        if (this.form.valid) {
          this.zona.nombreZona= this.form.value.nombreZona;
          this.zona.latitudZona = this.form.value.latitudZona;
          this.zona.longitudZona = this.form.value.longitudZona;
    
          this.zS.insert(this.zona).subscribe((data) => {
            this.zS.list().subscribe((data) => {
              this.zS.setList(data);
            });
          });
          this.router.navigate(['zonas']);
        }
      }
}
