import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {
  displayedColumns: string[] = [
    'idUsuario',
    'nombreUsuario',
    'emailUsuario',
    'telefonoUsuario',
    'direccionUsuario',
    'fechaRegistroUsuario',
    'username',
    'password',
    'enable'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  constructor(private uS: UsuariosService) { }
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
}

