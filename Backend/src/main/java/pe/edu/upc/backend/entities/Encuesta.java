package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDate;


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

    public Encuesta() {
    }

    public Encuesta(int idEncuesta, String nombreEncuesta, String descripcionEncuesta, LocalDate fechaCreacionEncuesta) {
        this.idEncuesta = idEncuesta;
        this.nombreEncuesta = nombreEncuesta;
        this.descripcionEncuesta = descripcionEncuesta;
        this.fechaCreacionEncuesta = fechaCreacionEncuesta;
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
