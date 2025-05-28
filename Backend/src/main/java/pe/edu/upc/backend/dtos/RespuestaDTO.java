package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.EncuestaPregunta;
import pe.edu.upc.backend.entities.Usuario;

import java.time.LocalDate;

public class RespuestaDTO {
    private long idRespuesta;
    private String textoRespuesta;
    private LocalDate fechaRespuesta;
    private EncuestaPregunta encuestaPregunta;
    private Usuario usuario;

    public long getIdRespuesta() {
        return idRespuesta;
    }

    public void setIdRespuesta(long idRespuesta) {
        this.idRespuesta = idRespuesta;
    }

    public String getTextoRespuesta() {
        return textoRespuesta;
    }

    public void setTextoRespuesta(String textoRespuesta) {
        this.textoRespuesta = textoRespuesta;
    }

    public LocalDate getFechaRespuesta() {
        return fechaRespuesta;
    }

    public void setFechaRespuesta(LocalDate fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }

    public EncuestaPregunta getEncuestaPregunta() {
        return encuestaPregunta;
    }

    public void setEncuestaPregunta(EncuestaPregunta encuestaPregunta) {
        this.encuestaPregunta = encuestaPregunta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
