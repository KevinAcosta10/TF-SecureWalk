import { Zona } from "../models/zona"

export class Ruta{
    idRuta:number=0
    horaInicio:Date= new Date()
    horaFin:Date=new Date()
    nivelSeguridad:string= ""
    zona:Zona = new Zona()
}