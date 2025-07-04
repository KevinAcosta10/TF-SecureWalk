import { Post } from "../models/post"
import { Usuario } from "../models/usuario"

export class Comentario {
    idComentario: number = 0
    descripcionComentario: string = ""
    post: Post = new Post()
    usuario: Usuario = new Usuario()
}