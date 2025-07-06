import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EvaluacionIncidente } from '../../../models/evaluacionincidente';
import { Usuario } from '../../../models/usuario';
import { Incidente } from '../../../models/incidente';
import { EvaluacionincidenteService } from '../../../services/evaluacionincidente.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { IncidenteService } from '../../../services/incidente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-insertarevaluacionincidente',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule,
        MatFormFieldModule,
        MatNativeDateModule,
        CommonModule,
        MatInputModule,
        NgIf,
    ],
    templateUrl: './insertarevaluacionincidente.component.html',
    styleUrl: './insertarevaluacionincidente.component.css'
})
export class InsertarevaluacionincidenteComponent {
  form: FormGroup = new FormGroup({});
  evaluacionincidente: EvaluacionIncidente = new EvaluacionIncidente();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];
  listaIncidentes: Incidente[] = [];

  tipos: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Aprobado' },
    { value: false, viewValue: 'Desaprobado' },
  ];
  constructor(
    private eS: EvaluacionincidenteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
    private iS: IncidenteService,
    private snackBar: MatSnackBar
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
      aprobacion: ['', Validators.required],
      fecha: ['', Validators.required],
      incidente: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.iS.list().subscribe((data) => {
      this.listaIncidentes = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.evaluacionincidente.idEvaluacionIncidente = this.form.value.codigo;
      this.evaluacionincidente.aprobacionIncidente = this.form.value.aprobacion;
      this.evaluacionincidente.fechaCreacionIncidente = this.form.value.fecha;
      this.evaluacionincidente.incidente.idIncidente =
        this.form.value.incidente;
      this.evaluacionincidente.usuario.idUsuario = this.form.value.usuario;

      if (this.edicion) {
        //actualizar
        this.eS.update(this.evaluacionincidente).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        //INSERTAR
        this.eS.insert(this.evaluacionincidente).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['evaluacionincidentes']);
      this.snackBar.open('Evaluación registrada exitosamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  cancelar() {
    this.router.navigate(['evaluacionincidentes']);
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idEvaluacionIncidente,
          aprobacion: data.aprobacionIncidente,
          fecha: data.fechaCreacionIncidente,
          incidente: data.incidente.idIncidente,
          usuario: data.usuario.idUsuario,
        });
      });
    }
  }
}
