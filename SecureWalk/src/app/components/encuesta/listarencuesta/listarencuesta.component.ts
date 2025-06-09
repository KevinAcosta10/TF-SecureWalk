import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Encuesta } from '../../../models/encuesta';
import { EncuestaService } from '../../../services/encuesta.service';

@Component({
  selector: 'app-listarencuesta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './listarencuesta.component.html',
  styleUrl: './listarencuesta.component.css'
})
export class ListarencuestaComponent {
  displayedColumns: string[] = [
    'idEncuesta',
    'nombreEncuesta',
    'descripcionEncuesta',
    'fechaCreacionEncuesta'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Encuesta> = new MatTableDataSource();
  constructor(private eD: EncuestaService) { }
  ngOnInit(): void {
    this.eD.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

}
