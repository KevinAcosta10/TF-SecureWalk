package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.EncuestaPregunta;
import pe.edu.upc.backend.entities.Usuario;

import java.time.LocalDate;

public class RespuestaDTO {
    private long idRespuesta;
    private String textoRespuesta;
    private LocalDate fechaRespuesta;
    private EncuestaPreguntaDTO encuestaPregunta;
    private UsuarioRolDTO usuario;

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

    public EncuestaPreguntaDTO getEncuestaPregunta() {
        return encuestaPregunta;
    }

    public void setEncuestaPregunta(EncuestaPreguntaDTO encuestaPregunta) {
        this.encuestaPregunta = encuestaPregunta;
    }

    public UsuarioRolDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioRolDTO usuario) {
        this.usuario = usuario;
    }
}
