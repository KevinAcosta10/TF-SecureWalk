import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarzonaComponent } from './listarzona/listarzona.component';

@Component({
  selector: 'app-zona',
  standalone: true,
  imports: [RouterOutlet,ListarzonaComponent],
  templateUrl: './zona.component.html',
  styleUrl: './zona.component.css'
})
export class ZonaComponent{
 constructor(public route: ActivatedRoute){}
}
