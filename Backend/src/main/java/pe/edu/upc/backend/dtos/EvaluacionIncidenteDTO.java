package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.Incidente;
import pe.edu.upc.backend.entities.Usuario;

import java.time.LocalDate;

public class EvaluacionIncidenteDTO {
    private int idEvaluacionIncidente;
    private boolean aprobacionIncidente;
    private LocalDate fechaCreacionIncidente;
    private IncidenteDTO incidente;
    private UsuarioRolDTO usuario;

    public int getIdEvaluacionIncidente() {
        return idEvaluacionIncidente;
    }

    public void setIdEvaluacionIncidente(int idEvaluacionIncidente) {
        this.idEvaluacionIncidente = idEvaluacionIncidente;
    }

    public boolean isAprobacionIncidente() {
        return aprobacionIncidente;
    }

    public void setAprobacionIncidente(boolean aprobacionIncidente) {
        this.aprobacionIncidente = aprobacionIncidente;
    }

    public LocalDate getFechaCreacionIncidente() {
        return fechaCreacionIncidente;
    }

    public void setFechaCreacionIncidente(LocalDate fechaCreacionIncidente) {
        this.fechaCreacionIncidente = fechaCreacionIncidente;
    }

    public IncidenteDTO getIncidente() {
        return incidente;
    }

    public void setIncidente(IncidenteDTO incidente) {
        this.incidente = incidente;
    }

    public UsuarioRolDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioRolDTO usuario) {
        this.usuario = usuario;
    }
}
