package pe.edu.upc.backend.dtos;

public class EncuestaPreguntaDTO {
    private long idEncuestaPregunta;
    private EncuestaDTO encuesta;
    private PreguntaDTO pregunta;

    public long getIdEncuestaPregunta() {
        return idEncuestaPregunta;
    }

    public void setIdEncuestaPregunta(long idEncuestaPregunta) {
        this.idEncuestaPregunta = idEncuestaPregunta;
    }

    public EncuestaDTO getEncuesta() {
        return encuesta;
    }

    public void setEncuesta(EncuestaDTO encuesta) {
        this.encuesta = encuesta;
    }

    public PreguntaDTO getPregunta() {
        return pregunta;
    }

    public void setPregunta(PreguntaDTO pregunta) {
        this.pregunta = pregunta;
    }
}
