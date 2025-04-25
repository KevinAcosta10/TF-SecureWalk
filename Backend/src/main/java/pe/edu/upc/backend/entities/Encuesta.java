package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="Encuesta")
public class Encuesta {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int idEncuesta;

    @Column(name="fechaEncuesta", nullable = false)
    private LocalDateTime fechaEncuesta;

    @Column(name="calificacionEncuesta", nullable = false)
    private int calificacionEncuesta;

    public Encuesta() {
    }

    public Encuesta(int idEncuesta, LocalDateTime fechaEncuesta, int calificacionEncuesta) {
        this.idEncuesta = idEncuesta;
        this.fechaEncuesta = fechaEncuesta;
        this.calificacionEncuesta = calificacionEncuesta;
    }

    public int getIdEncuesta() {
        return idEncuesta;
    }

    public void setIdEncuesta(int idEncuesta) {
        this.idEncuesta = idEncuesta;
    }

    public LocalDateTime getFechaEncuesta() {
        return fechaEncuesta;
    }

    public void setFechaEncuesta(LocalDateTime fechaEncuesta) {
        this.fechaEncuesta = fechaEncuesta;
    }

    public int getCalificacionEncuesta() {
        return calificacionEncuesta;
    }

    public void setCalificacionEncuesta(int calificacionEncuesta) {
        this.calificacionEncuesta = calificacionEncuesta;
    }
}
