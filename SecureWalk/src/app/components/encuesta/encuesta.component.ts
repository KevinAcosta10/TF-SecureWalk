import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarencuestaComponent } from './listarencuesta/listarencuesta.component';

@Component({
    selector: 'app-encuesta',
    imports: [RouterOutlet, ListarencuestaComponent],
    templateUrl: './encuesta.component.html',
    styleUrl: './encuesta.component.css'
})
export class EncuestaComponent{
  constructor(public route: ActivatedRoute) { }
}
