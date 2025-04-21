package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="EvaluacionIncidente")
public class EvaluacionIncidente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEvaluacionIncidente;

    @Column(name = "valoracion", nullable = false)
    private boolean valoracion;

    @Column(name = "fechaCreacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idIncidente")
    private Incidente incidente;

    public EvaluacionIncidente() {
    }

    public EvaluacionIncidente(int idEvaluacionIncidente, boolean valoracion, LocalDateTime fechaCreacion, Usuario usuario, Incidente incidente) {
        this.idEvaluacionIncidente = idEvaluacionIncidente;
        this.valoracion = valoracion;
        this.fechaCreacion = fechaCreacion;
        this.usuario = usuario;
        this.incidente = incidente;
    }

    public int getIdEvaluacionIncidente() {
        return idEvaluacionIncidente;
    }

    public void setIdEvaluacionIncidente(int idEvaluacionIncidente) {
        this.idEvaluacionIncidente = idEvaluacionIncidente;
    }

    public boolean isValoracion() {
        return valoracion;
    }

    public void setValoracion(boolean valoracion) {
        this.valoracion = valoracion;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
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