import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioRuta } from '../../../models/usuarioruta';
import { Usuario } from '../../../models/usuario';
import { Ruta } from '../../../models/ruta';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariorutaService } from '../../../services/usuarioruta.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RutaService } from '../../../services/ruta.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-insertareditarusuarioruta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatSelectModule,
      MatFormFieldModule,
      MatNativeDateModule,
      CommonModule,
      MatInputModule,
      NgIf,
      MatTimepickerModule],
  templateUrl: './insertareditarusuarioruta.component.html',
  styleUrl: './insertareditarusuarioruta.component.css',
})
export class InsertareditarusuariorutaComponent {
  form: FormGroup = new FormGroup({});
  usuarioruta: UsuarioRuta = new UsuarioRuta();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];
  listaRutas: Ruta[] = [];
constructor(
    private urS: UsuariorutaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuariosService,
    private iS: RutaService,
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
        usuario: ['', Validators.required],
        zonas: ['', Validators.required],
        horaInicio: ['', Validators.required],
        horaFin: ['', Validators.required],
      });
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
      this.iS.list().subscribe((data) => {
        this.listaRutas = data;
      });
    }
  
    aceptar() {
      if (this.form.valid) {
        this.usuarioruta.idUsuarioRuta = this.form.value.codigo;
        this.usuarioruta.usuario.nombreUsuario = this.form.value.usuario;
        this.usuarioruta.ruta.zona.nombreZona = this.form.value.zonas;
        this.usuarioruta.ruta.horaInicio = this.form.value.horaInicio;
        this.usuarioruta.ruta.horaFin = this.form.value.horaFIn;
  
        if (this.edicion) {
          //actualizar
          this.urS.update(this.usuarioruta).subscribe((data) => {
            this.urS.list().subscribe((data) => {
              this.urS.setList(data);
            });
          });
        } else {
          //INSERTAR
          this.urS.insert(this.usuarioruta).subscribe((data) => {
            this.urS.list().subscribe((data) => {
              this.urS.setList(data);
            });
          });
        }
        this.router.navigate(['usuarioRutas']);
        this.snackBar.open('Ruta registrada exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }
  
    cancelar() {
      this.router.navigate(['usuarioRutas']);
    }
  
    init() {
      if (this.edicion) {
        this.urS.listId(this.id).subscribe((data) => {
          this.form.patchValue({
            codigo: data.idUsuarioRuta,
            usuario: data.usuario.nombreUsuario,
            zonas: data.ruta.zona.nombreZona,
            horaInicio: data.ruta.horaInicio,
            horaFin: data.ruta.horaFin
          });
        });
      }
    }
}
