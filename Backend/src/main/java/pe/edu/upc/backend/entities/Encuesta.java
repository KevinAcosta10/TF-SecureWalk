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

    @Column(name="calificacionGeneral", nullable = false)
    private int calificacionGeneral;

    public Encuesta() {
    }

    public Encuesta(int idEncuesta, LocalDateTime fechaEncuesta, int calificacionGeneral) {
        this.idEncuesta = idEncuesta;
        this.fechaEncuesta = fechaEncuesta;
        this.calificacionGeneral = calificacionGeneral;
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

    public int getCalifacionGeneral() {
        return calificacionGeneral;
    }

    public void setCalifacionGeneral(int calificacionGeneral) {
        this.calificacionGeneral = calificacionGeneral;
    }
}
