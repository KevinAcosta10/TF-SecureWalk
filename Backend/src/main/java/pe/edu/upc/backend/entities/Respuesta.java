package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "Respuesta")
public class Respuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRespuesta;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idEncuestaPregunta")
    private EncuestaPregunta encuestaPregunta;

    @Column(name = "respuesta", nullable = false, length = 100)
    private String respuesta;

    @Column(name = "fechaRespuesta", nullable = false, length = 100)
    private LocalDate fechaRespuesta;

    public Respuesta() {
    }

    public Respuesta(long idRespuesta, Usuario usuario, EncuestaPregunta encuestaPregunta, String respuesta, LocalDate fechaRespuesta) {
        this.idRespuesta = idRespuesta;
        this.usuario = usuario;
        this.encuestaPregunta = encuestaPregunta;
        this.respuesta = respuesta;
        this.fechaRespuesta = fechaRespuesta;
    }

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
