import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioRuta } from '../../../models/usuarioRuta';
import { UsuarioRutaService } from '../../../services/usuario-ruta.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarusuarioruta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        CommonModule,
        MatSelectModule,
        MatButtonModule],
  templateUrl: './insertareditarusuarioruta.component.html',
  styleUrl: './insertareditarusuarioruta.component.css'
})
export class InsertareditarusuariorutaComponent {
form: FormGroup = new FormGroup({});
  usuarioruta: UsuarioRuta = new UsuarioRuta();

  id: number = 0;
  edicion: boolean = false;

  listaRuta:Ruta[]=[]
  listaUsuario:Usuario[]=[]

  constructor(
    private uS: UsuarioRutaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rS: RutaService,
    private sS:UsuariosService
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
      ruta: ['', Validators.required]
    });
    this.rS.list().subscribe(data=>{
      this.listaRuta=data
    });
    this.sS.list().subscribe(data=>{
      this.listaUsuario=data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.usuarioruta.idUsuarioRuta = this.form.value.codigo;
      this.usuarioruta.usuario = this.form.value.usuario;
      this.usuarioruta.ruta = this.form.value.ruta;
      if (this.edicion) {
        //actualizar
        this.uS.update(this.usuarioruta).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.uS.insert(this.usuarioruta).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      }
      this.router.navigate(['usuarioRuta'])
    }
  }

  cancelar() {
    this.router.navigate(['usuarioRuta']);
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuarioRuta),
          usuario: new FormControl(data.usuario),
          ruta: new FormControl(data.ruta), //deshabilita la edición del campo en específico a la hora de editar
        });
      });
    }
  }
}
