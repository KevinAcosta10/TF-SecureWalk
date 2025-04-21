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

    @Column(name="califacionGeneral", nullable = false)
    private int califacionGeneral;

    public Encuesta() {
    }

    public Encuesta(int idEncuesta, LocalDateTime fechaEncuesta, int califacionGeneral) {
        this.idEncuesta = idEncuesta;
        this.fechaEncuesta = fechaEncuesta;
        this.califacionGeneral = califacionGeneral;
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
        return califacionGeneral;
    }

    public void setCalifacionGeneral(int califacionGeneral) {
        this.califacionGeneral = califacionGeneral;
    }
}
