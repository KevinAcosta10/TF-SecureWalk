package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.EncuestaPregunta;
import pe.edu.upc.backend.entities.Usuario;

import java.time.LocalDate;

public class RespuestaDTO {
    private long idRespuesta;
    private Usuario usuario;
    private String respuesta;
    private LocalDate fechaRespuesta;
    private EncuestaPregunta encuestaPregunta;

    public long getIdRespuesta() {
        return idRespuesta;
    }

    public void setIdRespuesta(long idRespuesta) {
        this.idRespuesta = idRespuesta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public EncuestaPregunta getEncuestaPregunta() {
        return encuestaPregunta;
    }

    public void setEncuestaPregunta(EncuestaPregunta encuestaPregunta) {
        this.encuestaPregunta = encuestaPregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public LocalDate getFechaRespuesta() {
        return fechaRespuesta;
    }

    public void setFechaRespuesta(LocalDate fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }
}
