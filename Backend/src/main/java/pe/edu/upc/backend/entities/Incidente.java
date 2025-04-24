package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Incidente")
public class Incidente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idIncidente;
    @Column(name = "descripcionIncidente", nullable = false, length = 250)
    private String descripcionIncidente;
    @Column(name = "tipoIncidente", nullable = false, length = 250)
    private String tipoIncidente;
    @Column(name = "fechaIncidente", nullable = false)
    private LocalDate fechaIncidente;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario idUsuario;

    public Incidente() {
    }

    public Incidente(int idIncidente, String descripcionIncidente, String tipoIncidente, LocalDate fechaIncidente, Usuario idUsuario) {
        this.idIncidente = idIncidente;
        this.descripcionIncidente = descripcionIncidente;
        this.tipoIncidente = tipoIncidente;
        this.fechaIncidente = fechaIncidente;
        this.idUsuario = idUsuario;
    }

    public int getIdIncidente() {
        return idIncidente;
    }

    public void setIdIncidente(int idIncidente) {
        this.idIncidente = idIncidente;
    }

    public String getDescripcionIncidente() {
        return descripcionIncidente;
    }

    public void setDescripcionIncidente(String descripcionIncidente) {
        this.descripcionIncidente = descripcionIncidente;
    }

    public String getTipoIncidente() {
        return tipoIncidente;
    }

    public void setTipoIncidente(String tipoIncidente) {
        this.tipoIncidente = tipoIncidente;
    }

    public LocalDate getFechaIncidente() {
        return fechaIncidente;
    }

    public void setFechaIncidente(LocalDate fechaIncidente) {
        this.fechaIncidente = fechaIncidente;
    }

    public Usuario getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Usuario idUsuario) {
        this.idUsuario = idUsuario;
    }
}
