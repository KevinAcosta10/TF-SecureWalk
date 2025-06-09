package pe.edu.upc.backend.dtos;

import java.time.LocalTime;

public class RutaDTO {
    private int idRuta;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private String nivelSeguridad;
    private ZonaDTO zona;

    public int getIdRuta() {
        return idRuta;
    }

    public void setIdRuta(int idRuta) {
        this.idRuta = idRuta;
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

    public ZonaDTO getZona() {
        return zona;
    }

    public void setZona(ZonaDTO zona) {
        this.zona = zona;
    }
}
