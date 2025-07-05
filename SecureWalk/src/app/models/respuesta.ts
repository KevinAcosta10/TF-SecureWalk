import { EncuestaPregunta } from "../models/encuestapregunta"
import { Usuario } from "../models/usuario"

export class Respuesta{
    idRespuesta: number = 0
    textoRespuesta: String = ""
    fechaRespuesta: Date = new Date()
    encuestaPregunta:EncuestaPregunta = new EncuestaPregunta()
    usuario:Usuario = new Usuario()
}