import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  constructor(private uS: UsuariosService) { }
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
}

