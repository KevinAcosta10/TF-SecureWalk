package pe.edu.upc.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "EvaluacionIncidente")
public class EvaluacionIncidente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEvaluacionIncidente;

    @Column(name = "aprobacionIncidente")
    private Boolean aprobacionIncidente;
    @Column(name = "fechaCreacionIncidente")
    private LocalDate fechaCreacionIncidente;

    @ManyToOne
    @JoinColumn(name = "idIncidente", nullable = false)
    @JsonBackReference
    private Incidente incidente;
    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    public EvaluacionIncidente() {
    }

    public EvaluacionIncidente(int idEvaluacionIncidente, Boolean aprobacionIncidente, LocalDate fechaCreacionIncidente, Incidente incidente, Usuario usuario) {
        this.idEvaluacionIncidente = idEvaluacionIncidente;
        this.aprobacionIncidente = aprobacionIncidente;
        this.fechaCreacionIncidente = fechaCreacionIncidente;
        this.incidente = incidente;
        this.usuario = usuario;
    }

    public int getIdEvaluacionIncidente() {
        return idEvaluacionIncidente;
    }

    public void setIdEvaluacionIncidente(int idEvaluacionIncidente) {
        this.idEvaluacionIncidente = idEvaluacionIncidente;
    }

    public Boolean getAprobacionIncidente() {
        return aprobacionIncidente;
    }

    public void setAprobacionIncidente(Boolean aprobacionIncidente) {
        this.aprobacionIncidente = aprobacionIncidente;
    }

    public LocalDate getFechaCreacionIncidente() {
        return fechaCreacionIncidente;
    }

    public void setFechaCreacionIncidente(LocalDate fechaCreacionIncidente) {
        this.fechaCreacionIncidente = fechaCreacionIncidente;
    }

    public Incidente getIncidente() {
        return incidente;
    }

    public void setIncidente(Incidente incidente) {
        this.incidente = incidente;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}