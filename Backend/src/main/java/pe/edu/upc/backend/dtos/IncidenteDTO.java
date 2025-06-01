package pe.edu.upc.backend.dtos;

import java.time.LocalDate;

public class IncidenteDTO {
    private int idIncidente;
    private String tipoIncidente;
    private LocalDate fechaIncidente;
    private String descripcionIncidente;
    private ZonaDTO zona;
    private UsuarioRolDTO usuario;

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

    public ZonaDTO getZona() {
        return zona;
    }

    public void setZona(ZonaDTO zona) {
        this.zona = zona;
    }

    public UsuarioRolDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioRolDTO usuario) {
        this.usuario = usuario;
    }
}
