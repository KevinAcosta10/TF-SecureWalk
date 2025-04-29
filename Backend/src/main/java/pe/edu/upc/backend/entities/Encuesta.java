package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="Encuesta")
public class Encuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEncuesta;

    @Column(name = "fechaEncuesta", nullable = false)
    private LocalDate fechaEncuesta;

    @Column(name = "calificacionEncuesta", nullable = false)
    private int calificacionEncuesta;

    @Column(name = "completada", nullable = false)
    private boolean completadaEncuesta;

    public Encuesta() {
    }

    public Encuesta(int idEncuesta, LocalDate fechaEncuesta, int calificacionEncuesta, boolean completadaEncuesta) {
        this.idEncuesta = idEncuesta;
        this.fechaEncuesta = fechaEncuesta;
        this.calificacionEncuesta = calificacionEncuesta;
        this.completadaEncuesta = completadaEncuesta;
    }

    public int getIdEncuesta() {
        return idEncuesta;
    }

    public void setIdEncuesta(int idEncuesta) {
        this.idEncuesta = idEncuesta;
    }

    public LocalDate getFechaEncuesta() {
        return fechaEncuesta;
    }

    public void setFechaEncuesta(LocalDate fechaEncuesta) {
        this.fechaEncuesta = fechaEncuesta;
    }

    public int getCalificacionEncuesta() {
        return calificacionEncuesta;
    }

    public void setCalificacionEncuesta(int calificacionEncuesta) {
        this.calificacionEncuesta = calificacionEncuesta;
    }

    public boolean getCompletadaEncuesta() {return completadaEncuesta;}

    public void setCompletadaEncuesta(boolean completadaEncuesta) {this.completadaEncuesta = completadaEncuesta;}
}
