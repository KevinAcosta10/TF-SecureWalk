import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EncuestaPregunta } from '../../../models/encuestapregunta';
import { EncuestapreguntaService } from '../../../services/encuestapregunta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarencuestapregunta',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarencuestapregunta.component.html',
  styleUrl: './listarencuestapregunta.component.css'
})
export class ListarencuestapreguntaComponent {
displayedColumns: string[] = ['c1', 'c2', 'c3'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<EncuestaPregunta> = new MatTableDataSource();
  constructor(private rS: EncuestapreguntaService) {}
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
