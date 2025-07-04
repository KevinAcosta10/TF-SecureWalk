import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { EvaluacionIncidente } from '../../../models/evaluacionincidente';
import { EvaluacionincidenteService } from '../../../services/evaluacionincidente.service';

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
    CarouselModule,
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
  customOptions: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true, 
  navSpeed: 700,
  navText: [
    '<span class="owl-prev-icon">&lsaquo;</span>', // 
    '<span class="owl-next-icon">&rsaquo;</span>', // 
  ],
  nav: true,
  slideBy: 1, 
  autoplay: true, 
  autoplayTimeout: 5000, 
  autoplayHoverPause: true, 
  responsive: { 
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1024: {
      items: 3 
    },
    1400: {
      items: 4 
    }
  },
};

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
