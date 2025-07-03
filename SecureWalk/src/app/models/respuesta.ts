import { EncuestaPregunta } from "./encuestapregunta"
import { Usuario } from "./usuario"

export class Respuesta {
    idRespuesta: number = 0
    textoRespuesta : string = ""
    fechaRespuesta: Date = new Date()
    encuestaPregunta: EncuestaPregunta = new EncuestaPregunta()
    usuario:Usuario= new Usuario()
}