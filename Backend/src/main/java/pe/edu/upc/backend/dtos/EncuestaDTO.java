package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.EncuestaPregunta;

import java.time.LocalDateTime;
import java.util.List;


public class EncuestaDTO {

    private int idEncuesta;
    private String nombreEncuesta;
    private LocalDateTime fechaCreacionEncuesta;
    private String descripcionEncuesta;
    List<EncuestaPregunta> encuestas;

    public int getIdEncuesta() {
        return idEncuesta;
    }

    public void setIdEncuesta(int idEncuesta) {
        this.idEncuesta = idEncuesta;
    }

    public String getNombreEncuesta() {
        return nombreEncuesta;
    }

    public void setNombreEncuesta(String nombreEncuesta) {
        this.nombreEncuesta = nombreEncuesta;
    }

    public LocalDateTime getFechaCreacionEncuesta() {
        return fechaCreacionEncuesta;
    }

    public void setFechaCreacionEncuesta(LocalDateTime fechaCreacionEncuesta) {
        this.fechaCreacionEncuesta = fechaCreacionEncuesta;
    }

    public String getDescripcionEncuesta() {
        return descripcionEncuesta;
    }

    public void setDescripcionEncuesta(String descripcionEncuesta) {
        this.descripcionEncuesta = descripcionEncuesta;
    }

    public List<EncuestaPregunta> getEncuestas() {
        return encuestas;
    }

    public void setEncuestas(List<EncuestaPregunta> encuestas) {
        this.encuestas = encuestas;
    }
}
