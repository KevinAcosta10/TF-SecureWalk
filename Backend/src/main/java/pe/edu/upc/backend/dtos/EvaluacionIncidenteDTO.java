package pe.edu.upc.backend.dtos;

import java.time.LocalDateTime;

public class EvaluacionIncidenteDTO {
    private int idIncidente;
    private boolean valoracion;
    private LocalDateTime fechaIncidente;

    public int getIdIncidente() {
        return idIncidente;
    }

    public void setIdIncidente(int idIncidente) {
        this.idIncidente = idIncidente;
    }

    public boolean isValoracion() {
        return valoracion;
    }

    public void setValoracion(boolean valoracion) {
        this.valoracion = valoracion;
    }

    public LocalDateTime getFechaIncidente() {
        return fechaIncidente;
    }

    public void setFechaIncidente(LocalDateTime fechaIncidente) {
        this.fechaIncidente = fechaIncidente;
    }
}
