package pe.edu.upc.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "Encuesta")
public class Encuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEncuesta;

    @Column(name = "nombreEncuesta")
    private String nombreEncuesta;
    @Column(name = "descripcionEncuesta")
    private String descripcionEncuesta;
    @Column(name = "fechaCreacionEncuesta")
    private LocalDate fechaCreacionEncuesta;

    @OneToMany(mappedBy = "encuesta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<EncuestaPregunta> encuestasPreguntas;

    public Encuesta() {
    }

    public Encuesta(int idEncuesta, String nombreEncuesta, String descripcionEncuesta, LocalDate fechaCreacionEncuesta) {
        this.idEncuesta = idEncuesta;
        this.nombreEncuesta = nombreEncuesta;
        this.descripcionEncuesta = descripcionEncuesta;
        this.fechaCreacionEncuesta = fechaCreacionEncuesta;
    }

    public List<EncuestaPregunta> getEncuestasPreguntas() {
        return encuestasPreguntas;
    }

    public void setEncuestasPreguntas(List<EncuestaPregunta> encuestasPreguntas) {
        this.encuestasPreguntas = encuestasPreguntas;
    }

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
}
