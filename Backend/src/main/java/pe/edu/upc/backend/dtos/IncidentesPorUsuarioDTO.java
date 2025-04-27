package pe.edu.upc.backend.dtos;

import java.time.LocalDate;


public class IncidentesPorUsuarioDTO {
    private Long idIncidente;
    private String descripcionIncidente;
    private LocalDate fechaIncidente;
    private String tipoIncidente;
    private Long idUsuario;
    private String nombreUsuario;

    public IncidentesPorUsuarioDTO(Long idIncidente, String descripcionIncidente, LocalDate fechaIncidente, String tipoIncidente, Long idUsuario, String nombreUsuario) {
        this.idIncidente = idIncidente;
        this.descripcionIncidente = descripcionIncidente;
        this.fechaIncidente = fechaIncidente;
        this.tipoIncidente = tipoIncidente;
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
    }

    public Long getIdIncidente() {
        return idIncidente;
    }

    public void setIdIncidente(Long idIncidente) {
        this.idIncidente = idIncidente;
    }

    public String getDescripcionIncidente() {
        return descripcionIncidente;
    }

    public void setDescripcionIncidente(String descripcionIncidente) {
        this.descripcionIncidente = descripcionIncidente;
    }

    public LocalDate getFechaIncidente() {
        return fechaIncidente;
    }

    public void setFechaIncidente(LocalDate fechaIncidente) {
        this.fechaIncidente = fechaIncidente;
    }

    public String getTipoIncidente() {
        return tipoIncidente;
    }

    public void setTipoIncidente(String tipoIncidente) {
        this.tipoIncidente = tipoIncidente;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
}
