import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarencuestapreguntaComponent } from './listarencuestapregunta/listarencuestapregunta.component';

@Component({
  selector: 'app-encuestapregunta',
  standalone: true,
  imports: [RouterOutlet,ListarencuestapreguntaComponent],
  templateUrl: './encuestapregunta.component.html',
  styleUrl: './encuestapregunta.component.css'
})
export class EncuestapreguntaComponent {
constructor(public route: ActivatedRoute) {}
}
