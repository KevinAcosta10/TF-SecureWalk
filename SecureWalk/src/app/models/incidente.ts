import { Zona } from "../models/zona"
import { Usuario } from "../models/usuario"

export class Incidente {
    idIncidente: number = 0
    tipoIncidente: string = ""
    fechaIncidente: Date = new Date()
    descripcionIncidente: string = ""
    zona: Zona = new Zona()
    usuario: Usuario = new Usuario()
}