import { Component } from '@angular/core';
import { Incidente } from '../../../models/incidente';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { IncidenteService } from '../../../services/incidente.service';

@Component({
  selector: 'app-listarincidente',
  standalone: true,
  imports: [MatTableModule,
    CommonModule],
  templateUrl: './listarincidente.component.html',
  styleUrl: './listarincidente.component.css'
})
export class ListarincidenteComponent {
  dataSource: MatTableDataSource<Incidente> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5']
  constructor(private iS: IncidenteService) { }

  ngOnInit(): void {
    this.iS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.iS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
}
