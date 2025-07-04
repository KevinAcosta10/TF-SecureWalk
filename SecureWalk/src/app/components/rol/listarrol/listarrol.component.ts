import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css',
})
export class ListarrolComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  constructor(private rS: RolService) {}
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
