import { Component, OnInit, ViewChild } from '@angular/core';
import { Pregunta } from '../../../models/pregunta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PreguntaService } from '../../../services/pregunta.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarpregunta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterLink],
  templateUrl: './listarpregunta.component.html',
  styleUrl: './listarpregunta.component.css',
})
export class ListarpreguntaComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Pregunta> = new MatTableDataSource();
  constructor(private pS: PreguntaService) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.pS.deleteS(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}
