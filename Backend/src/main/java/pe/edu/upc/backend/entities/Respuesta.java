package pe.edu.upc.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Respuesta")
public class Respuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRespuesta;

    @Column(name = "textoRespuesta")
    private String textoRespuesta;
    @Column(name = "fechaRespuesta")
    private LocalDate fechaRespuesta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idEncuestaPregunta", nullable = false)
    @JsonBackReference
    private EncuestaPregunta encuestaPregunta;
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    @JsonBackReference
    private Usuario usuario;

    public Respuesta() {
    }

    public Respuesta(int idRespuesta, String textoRespuesta, LocalDate fechaRespuesta, EncuestaPregunta encuestaPregunta, Usuario usuario) {
        this.idRespuesta = idRespuesta;
        this.textoRespuesta = textoRespuesta;
        this.fechaRespuesta = fechaRespuesta;
        this.encuestaPregunta = encuestaPregunta;
        this.usuario = usuario;
    }

    public int getIdRespuesta() {
        return idRespuesta;
    }

    public void setIdRespuesta(int idRespuesta) {
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
