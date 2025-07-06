import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuariorutaComponent } from './listarusuarioruta/listarusuarioruta.component';

@Component({
  selector: 'app-usuarioruta',
  standalone: true,
  imports: [RouterOutlet, ListarusuariorutaComponent],
  templateUrl: './usuarioruta.component.html',
  styleUrl: './usuarioruta.component.css'
})
export class UsuariorutaComponent {
constructor(public route: ActivatedRoute) { }
}
