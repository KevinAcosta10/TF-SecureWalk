package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Incidente")
public class Incidente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idIncidente;

    @Column(name = "tipoIncidente")
    private String tipoIncidente;
    @Column(name = "fechaIncidente")
    private LocalDate fechaIncidente;
    @Column(name = "descripcionIncidente")
    private String descripcionIncidente;

    @ManyToOne
    @JoinColumn(name = "idZona", nullable = false)
    private Zona zona;
    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    public Incidente() {
    }

    public Incidente(int idIncidente, String tipoIncidente, LocalDate fechaIncidente, String descripcionIncidente, Zona zona, Usuario usuario) {
        this.idIncidente = idIncidente;
        this.tipoIncidente = tipoIncidente;
        this.fechaIncidente = fechaIncidente;
        this.descripcionIncidente = descripcionIncidente;
        this.zona = zona;
        this.usuario = usuario;
    }

    public int getIdIncidente() {
        return idIncidente;
    }

    public void setIdIncidente(int idIncidente) {
        this.idIncidente = idIncidente;
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

    public String getDescripcionIncidente() {
        return descripcionIncidente;
    }

    public void setDescripcionIncidente(String descripcionIncidente) {
        this.descripcionIncidente = descripcionIncidente;
    }

    public Zona getZona() {
        return zona;
    }

    public void setZona(Zona zona) {
        this.zona = zona;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
