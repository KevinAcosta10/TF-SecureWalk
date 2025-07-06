import { Usuario } from "../models/usuario"

export class Post {
    idPost: number = 0
    descripcionPost: string = ""
    usuario: Usuario = new Usuario()
}