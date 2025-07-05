package pe.edu.upc.backend.dtos;

import java.time.LocalDate; // O java.util.Date si usas eso para las fechas
import java.util.List;

public class EncuestaConPreguntasDTO {
    private Integer idEncuesta;
    private String nombreEncuesta;
    private String descripcionEncuesta;
    private LocalDate fechaCreacionEncuesta;

    private List<PreguntaDTO> preguntas; // La lista de preguntas para esta encuesta

    public EncuestaConPreguntasDTO() {}


    public Integer getIdEncuesta() {
        return idEncuesta;
    }

    public void setIdEncuesta(Integer idEncuesta) {
        this.idEncuesta = idEncuesta;
    }

    public String getNombreEncuesta() {
        return nombreEncuesta;
    }

    public void setNombreEncuesta(String nombreEncuesta) {
        this.nombreEncuesta = nombreEncuesta;
    }

    public String getDescripcionEncuesta() {
        return descripcionEncuesta;
    }

    public void setDescripcionEncuesta(String descripcionEncuesta) {
        this.descripcionEncuesta = descripcionEncuesta;
    }

    public LocalDate getFechaCreacionEncuesta() {
        return fechaCreacionEncuesta;
    }

    public void setFechaCreacionEncuesta(LocalDate fechaCreacionEncuesta) {
        this.fechaCreacionEncuesta = fechaCreacionEncuesta;
    }

    public List<PreguntaDTO> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<PreguntaDTO> preguntas) {
        this.preguntas = preguntas;
    }
}