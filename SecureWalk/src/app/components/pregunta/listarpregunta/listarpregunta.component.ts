import { Component, OnInit, ViewChild } from '@angular/core';
import { Pregunta } from '../../../models/pregunta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PreguntaService } from '../../../services/pregunta.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarpregunta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './listarpregunta.component.html',
  styleUrl: './listarpregunta.component.css'
})
export class ListarpreguntaComponent implements OnInit {
  displayedColumns: string[] = [
    'idPregunta',
    'textoPregunta',
    'tipoPregunta',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Pregunta> = new MatTableDataSource();
  constructor(private pS: PreguntaService) { }
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
}
