import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { EvaluacionIncidente } from '../../../models/evaluacionincidente';
import { EvaluacionincidenteService } from '../../../services/evaluacionincidente.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarevaluacionincidente',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarevaluacionincidente.component.html',
  styleUrl: './listarevaluacionincidente.component.css',
})
export class ListarevaluacionincidenteComponent {
  evaluacionincidente: EvaluacionIncidente[] = [];
  enable: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Aprobado' },
    { value: false, viewValue: 'Desaprobado' },
  ];

  constructor(private eiS: EvaluacionincidenteService) {}

  ngOnInit(): void {
    this.eiS.list().subscribe((data) => {
      this.evaluacionincidente = data;
    });
    this.eiS.getList().subscribe((data) => {
      this.evaluacionincidente = data;
    });
  }
  eliminar(id: number) {
    this.eiS.deleteS(id).subscribe((data) => {
      this.eiS.list().subscribe((data) => {
        this.eiS.setList(data);
      });
    });
  }
}
