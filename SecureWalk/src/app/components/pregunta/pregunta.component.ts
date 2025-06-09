import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpreguntaComponent } from './listarpregunta/listarpregunta.component';

@Component({
  selector: 'app-pregunta',
  standalone: true,
  imports: [RouterOutlet,ListarpreguntaComponent],
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css'
})
export class PreguntaComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void {

  }
}
