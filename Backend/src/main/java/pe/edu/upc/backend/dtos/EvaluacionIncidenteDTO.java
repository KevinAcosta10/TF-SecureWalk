package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.Incidente;
import pe.edu.upc.backend.entities.Usuario;

import java.time.LocalDate;

public class EvaluacionIncidenteDTO {
    private int idEvaluacionIncidente;
    private boolean aprobacionIncidente;
    private LocalDate fechaCreacionIncidente;
    private Incidente incidente;
    private Usuario usuario;

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
