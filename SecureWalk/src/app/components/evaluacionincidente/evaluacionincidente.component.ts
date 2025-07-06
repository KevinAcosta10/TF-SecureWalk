import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarevaluacionincidenteComponent } from './listarevaluacionincidente/listarevaluacionincidente.component';

@Component({
    selector: 'app-evaluacionincidente',
    imports: [RouterOutlet, ListarevaluacionincidenteComponent],
    templateUrl: './evaluacionincidente.component.html',
    styleUrl: './evaluacionincidente.component.css'
})
export class EvaluacionincidenteComponent {
  constructor(public route: ActivatedRoute) { }
}
