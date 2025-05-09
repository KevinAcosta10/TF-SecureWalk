package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="Encuesta")
public class Encuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEncuesta;

    @Column(name = "nombreEncuesta", nullable = false)
    private String nombreEncuesta;

    @Column(name = "fechaCreacionEncuesta", nullable = false)
    private LocalDateTime fechaCreacionEncuesta;

    @Column(name = "descripcionEncuesta", nullable = false)
    private String descripcionEncuesta;

    @OneToMany(mappedBy = "idEncuesta", cascade = CascadeType.ALL)
    private List<EncuestaPregunta> encuestaPreguntas;

    public Encuesta() {
    }

    public Encuesta(long idEncuesta, String nombreEncuesta, LocalDateTime fechaCreacionEncuesta, String descripcionEncuesta, List<EncuestaPregunta> encuestaPreguntas) {
        this.idEncuesta = idEncuesta;
        this.nombreEncuesta = nombreEncuesta;
        this.fechaCreacionEncuesta = fechaCreacionEncuesta;
        this.descripcionEncuesta = descripcionEncuesta;
        this.encuestaPreguntas = encuestaPreguntas;
    }

    public long getIdEncuesta() {
        return idEncuesta;
    }

    public void setIdEncuesta(long idEncuesta) {
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

    public List<EncuestaPregunta> getEncuestaPreguntas() {
        return encuestaPreguntas;
    }

    public void setEncuestaPreguntas(List<EncuestaPregunta> encuestaPreguntas) {
        this.encuestaPreguntas = encuestaPreguntas;
    }
}
