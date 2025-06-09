import { Component, OnInit, ViewChild } from '@angular/core';
import { Zona } from '../../../models/zona';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ZonaService } from '../../../services/zona.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarzona',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './listarzona.component.html',
  styleUrl: './listarzona.component.css'
})
export class ListarzonaComponent implements OnInit {
  displayedColumns: string[] = [
    'idZona',
    'latitudZona',
    'longitudZona',
    'nombreZona',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Zona> = new MatTableDataSource();
  constructor(private zS: ZonaService) { }
  ngOnInit(): void {
    this.zS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
}
