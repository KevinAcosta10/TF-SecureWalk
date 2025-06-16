import { Component, OnInit, ViewChild } from '@angular/core';
import { Zona } from '../../../models/zona';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ZonaService } from '../../../services/zona.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarzona',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarzona.component.html',
  styleUrl: './listarzona.component.css'
})
export class ListarzonaComponent implements OnInit {
  displayedColumns: string[] = [
    'idZona',
    'latitudZona',
    'longitudZona',
    'nombreZona',
    'ediciones',
    'eliminar'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Zona> = new MatTableDataSource();
  constructor(private zS: ZonaService) { }
  ngOnInit(): void {
    this.zS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
     this.zS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.zS.deleteS(id).subscribe(data=>{
      this.zS.list().subscribe(data=>{
        this.zS.setList(data)
      })
    })
  }
}
