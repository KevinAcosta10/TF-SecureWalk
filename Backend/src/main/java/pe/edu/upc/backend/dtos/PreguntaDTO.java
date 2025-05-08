package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.EncuestaPregunta;

import java.util.List;

public class PreguntaDTO {

    private int idPregunta;
    private String textoPregunta;
    private String tipoPregunta;
    List<EncuestaPregunta> preguntas;

    public int getIdPregunta() {
        return idPregunta;
    }

    public void setIdPregunta(int idPregunta) {
        this.idPregunta = idPregunta;
    }

    public String getTextoPregunta() {
        return textoPregunta;
    }

    public void setTextoPregunta(String textoPregunta) {
        this.textoPregunta = textoPregunta;
    }

    public String getTipoPregunta() {
        return tipoPregunta;
    }

    public void setTipoPregunta(String tipoPregunta) {
        this.tipoPregunta = tipoPregunta;
    }

    public List<EncuestaPregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<EncuestaPregunta> preguntas) {
        this.preguntas = preguntas;
    }
}
