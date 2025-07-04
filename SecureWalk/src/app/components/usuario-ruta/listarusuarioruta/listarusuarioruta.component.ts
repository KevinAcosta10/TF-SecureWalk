import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioRuta } from '../../../models/usuarioRuta';
import { UsuarioRutaService } from '../../../services/usuario-ruta.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarusuarioruta',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatIconModule],
  templateUrl: './listarusuarioruta.component.html',
  styleUrl: './listarusuarioruta.component.css'
})
export class ListarusuariorutaComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    dataSource: MatTableDataSource<UsuarioRuta> = new MatTableDataSource();
    constructor(private rS: UsuarioRutaService) {}
    ngOnInit(): void {
      this.rS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.rS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
    eliminar(id: number) {
      this.rS.deleteS(id).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
    }
}
