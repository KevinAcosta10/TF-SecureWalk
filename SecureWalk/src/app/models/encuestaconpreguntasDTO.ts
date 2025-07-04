import { Pregunta } from "../models/pregunta";

export interface EncuestaConPreguntasDTO {
  idEncuesta: number;
  nombreEncuesta: string;
  descripcionEncuesta: string;
  fechaCreacionEncuesta: string; // O `Date` si tu backend lo envía como objeto Date JSON
  preguntas: Pregunta[]; // Aquí se agrupan las preguntas
}