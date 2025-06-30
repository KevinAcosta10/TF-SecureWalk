import { Encuesta } from "../models/encuesta"
import { Pregunta } from "../models/pregunta"

export class EncuestaPregunta{
    idEncuestaPregunta:number=0
    encuesta: Encuesta = new Encuesta()
    pregunta: Pregunta = new Pregunta()
}