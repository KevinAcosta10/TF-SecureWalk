import { Ruta } from '../models/ruta';
import { Usuario } from '../models/usuario';

export class UsuarioRuta {
  idUsuarioRuta: number = 0;
  ruta: Ruta = new Ruta();
  usuario: Usuario = new Usuario();
}
