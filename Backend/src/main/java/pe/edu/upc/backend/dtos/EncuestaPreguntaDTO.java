package pe.edu.upc.backend.dtos;

import jakarta.persistence.*;
import pe.edu.upc.backend.entities.Encuesta;
import pe.edu.upc.backend.entities.Pregunta;

public class EncuestaPreguntaDTO {
    private long idEncuestaPregunta;
    private Encuesta encuesta;
    private Pregunta pregunta;

    public long getIdEncuestaPregunta() {
        return idEncuestaPregunta;
    }

    public void setIdEncuestaPregunta(long idEncuestaPregunta) {
        this.idEncuestaPregunta = idEncuestaPregunta;
    }

    public Encuesta getEncuesta() {
        return encuesta;
    }

    public void setEncuesta(Encuesta encuesta) {
        this.encuesta = encuesta;
    }

    public Pregunta getPregunta() {
        return pregunta;
    }

    public void setPregunta(Pregunta pregunta) {
        this.pregunta = pregunta;
    }
}
