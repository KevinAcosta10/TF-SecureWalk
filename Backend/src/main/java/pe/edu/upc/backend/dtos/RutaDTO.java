package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.Zona;

import java.time.LocalTime;

public class RutaDTO {
    private int idRuta;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private int nivelSeguridad;
    private Zona zona;

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

    public int getNivelSeguridad() {
        return nivelSeguridad;
    }

    public void setNivelSeguridad(int nivelSeguridad) {
        this.nivelSeguridad = nivelSeguridad;
    }

    public Zona getZona() {
        return zona;
    }

    public void setZona(Zona zona) {
        this.zona = zona;
    }
}
