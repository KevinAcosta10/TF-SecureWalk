package pe.edu.upc.backend.dtos;

import java.time.LocalTime;

public class RutaDTO {
    private int idRuta;
    private LocalTime horaInicioRuta;
    private LocalTime horaFinRuta;
    private String nivelSeguridadRuta;

    public int getIdRuta() {
        return idRuta;
    }

    public void setIdRuta(int idRuta) {
        this.idRuta = idRuta;
    }

    public LocalTime getHoraInicioRuta() {
        return horaInicioRuta;
    }

    public void setHoraInicioRuta(LocalTime horaInicioRuta) {
        this.horaInicioRuta = horaInicioRuta;
    }

    public LocalTime getHoraFinRuta() {
        return horaFinRuta;
    }

    public void setHoraFinRuta(LocalTime horaFinRuta) {
        this.horaFinRuta = horaFinRuta;
    }

    public String getNivelSeguridadRuta() {
        return nivelSeguridadRuta;
    }

    public void setNivelSeguridadRuta(String nivelSeguridadRuta) {
        this.nivelSeguridadRuta = nivelSeguridadRuta;
    }
}
