import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuariorutaComponent } from './listarusuarioruta/listarusuarioruta.component';

@Component({
  selector: 'app-usuario-ruta',
  standalone: true,
  imports: [RouterOutlet,ListarusuariorutaComponent],
  templateUrl: './usuario-ruta.component.html',
  styleUrl: './usuario-ruta.component.css'
})
export class UsuarioRutaComponent {
  constructor(public route: ActivatedRoute) {}
}
