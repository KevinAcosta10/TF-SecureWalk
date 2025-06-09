package pe.edu.upc.backend.dtos;

import java.time.LocalTime;

public class RutasXSeguridadDTO {
    private int IdRuta;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private String nivelSeguridad;
    private String nombreZona;

    public int getIdRuta() {
        return IdRuta;
    }

    public void setIdRuta(int idRuta) {
        IdRuta = idRuta;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
    }

    public String getNivelSeguridad() {
        return nivelSeguridad;
    }

    public void setNivelSeguridad(String nivelSeguridad) {
        this.nivelSeguridad = nivelSeguridad;
    }

    public String getNombreZona() {
        return nombreZona;
    }

    public void setNombreZona(String nombreZona) {
        this.nombreZona = nombreZona;
    }
}
