import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Encuesta } from '../../../models/encuesta';
import { EncuestaService } from '../../../services/encuesta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarencuesta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterLink],
  templateUrl: './listarencuesta.component.html',
  styleUrl: './listarencuesta.component.css',
})
export class ListarencuestaComponent {
  displayedColumns: string[] = ['c1',  'c2', 'c3', 'c4', 'c5', 'c6' ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Encuesta> = new MatTableDataSource();
  constructor(private eS: EncuestaService) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.eS.deleteS(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}
