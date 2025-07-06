import { Incidente } from "./incidente"
import { Usuario } from "./usuario"

export class EvaluacionIncidente{
    idEvaluacionIncidente: number = 0
    aprobacionIncidente: boolean = true
    fechaCreacionIncidente:  Date = new Date()
    incidente: Incidente = new Incidente()
    usuario: Usuario = new Usuario()
}