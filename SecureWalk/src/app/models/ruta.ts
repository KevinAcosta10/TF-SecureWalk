import { Zona } from "../models/zona"

export class Ruta{
    idRuta:number=0
    horaInicio: string | null = null; // Initialize as null
    horaFin: string | null = null;    // Initialize as null
    nivelSeguridad:string= ""
    zona:Zona = new Zona()
}