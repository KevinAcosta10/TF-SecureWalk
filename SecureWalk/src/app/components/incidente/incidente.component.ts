import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarincidenteComponent } from './listarincidente/listarincidente.component';

@Component({
    selector: 'app-incidente',
    imports: [RouterOutlet, ListarincidenteComponent],
    templateUrl: './incidente.component.html',
    styleUrl: './incidente.component.css'
})
export class IncidenteComponent {
  constructor(public route: ActivatedRoute) { }
}
