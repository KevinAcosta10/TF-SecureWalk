package pe.edu.upc.backend.dtos;

import java.time.LocalDateTime;

public class EvaluacionIncidenteDTO {
    private int idIncidente;
    private boolean valoracionIncidente;
    private LocalDateTime fechaCreacionIncidente;

    public int getIdIncidente() {
        return idIncidente;
    }

    public void setIdIncidente(int idIncidente) {
        this.idIncidente = idIncidente;
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
}
