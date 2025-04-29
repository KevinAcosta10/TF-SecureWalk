package pe.edu.upc.backend.dtos;

import java.time.LocalDateTime;

public class EncuestaDTO {
    private int idEncuesta;
    private LocalDateTime fechaEncuesta;
    private int calificacionEncuesta;
    private boolean completadaEncuesta;

    public int getIdEncuesta() {
        return idEncuesta;
    }

    public void setIdEncuesta(int idEncuesta) {
        this.idEncuesta = idEncuesta;
    }

    public LocalDateTime getFechaEncuesta() {
        return fechaEncuesta;
    }

    public void setFechaEncuesta(LocalDateTime fechaEncuesta) {
        this.fechaEncuesta = fechaEncuesta;
    }

    public int getCalificacionEncuesta() {
        return calificacionEncuesta;
    }

    public void setCalificacionEncuesta(int calificacionEncuesta) {
        this.calificacionEncuesta = calificacionEncuesta;
    }

    public boolean getCompletadaEncuesta() {return completadaEncuesta;}

    public void setCompletadaEncuesta(boolean completadaEncuesta) {this.completadaEncuesta = completadaEncuesta;}
}
