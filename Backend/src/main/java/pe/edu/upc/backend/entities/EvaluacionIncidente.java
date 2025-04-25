package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="EvaluacionIncidente")
public class EvaluacionIncidente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEvaluacionIncidente;

    @Column(name = "valoracionIncidente", nullable = false)
    private boolean valoracionIncidente;

    @Column(name = "fechaCreacionIncidente", nullable = false)
    private LocalDateTime fechaCreacionIncidente;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idIncidente")
    private Incidente incidente;

    public EvaluacionIncidente() {
    }

    public EvaluacionIncidente(int idEvaluacionIncidente, boolean valoracionIncidente, LocalDateTime fechaCreacionIncidente, Usuario usuario, Incidente incidente) {
        this.idEvaluacionIncidente = idEvaluacionIncidente;
        this.valoracionIncidente = valoracionIncidente;
        this.fechaCreacionIncidente = fechaCreacionIncidente;
        this.usuario = usuario;
        this.incidente = incidente;
    }

    public int getIdEvaluacionIncidente() {
        return idEvaluacionIncidente;
    }

    public void setIdEvaluacionIncidente(int idEvaluacionIncidente) {
        this.idEvaluacionIncidente = idEvaluacionIncidente;
    }

    public boolean isValoracionIncidente() {
        return valoracionIncidente;
    }

    public void setValoracionIncidente(boolean valoracionIncidente) {
        this.valoracionIncidente = valoracionIncidente;
    }

    public LocalDateTime getFechaCreacionIncidente() {
        return fechaCreacionIncidente;
    }

    public void setFechaCreacionIncidente(LocalDateTime fechaCreacionIncidente) {
        this.fechaCreacionIncidente = fechaCreacionIncidente;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Incidente getIncidente() {
        return incidente;
    }

    public void setIncidente(Incidente incidente) {
        this.incidente = incidente;
    }
}