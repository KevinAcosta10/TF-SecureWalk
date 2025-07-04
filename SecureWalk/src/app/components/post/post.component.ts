import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpostComponent } from './listarpost/listarpost.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterOutlet,ListarpostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  constructor(public route: ActivatedRoute) { }
}
