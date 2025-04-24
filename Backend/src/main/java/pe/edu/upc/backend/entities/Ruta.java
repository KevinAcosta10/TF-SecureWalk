package pe.edu.upc.backend.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Table (name = "Ruta")
public class Ruta {
    private int idRuta;
    private int idZona;
    private int idUsuario;
    private LocalDateTime fechaHoraInicio;
    private LocalDateTime fechaHoraFin;

    public Ruta() {
    }

    public Ruta(int idRuta, int idZona, int idUsuario, LocalDateTime fechaHoraInicio, LocalDateTime fechaHoraFin) {
        this.idRuta = idRuta;
        this.idZona = idZona;
        this.idUsuario = idUsuario;
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
    }

    public int getIdRuta() {
        return idRuta;
    }

    public void setIdRuta(int idRuta) {
        this.idRuta = idRuta;
    }

    public int getIdZona() {
        return idZona;
    }

    public void setIdZona(int idZona) {
        this.idZona = idZona;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public LocalDateTime getFechaHoraInicio() {
        return fechaHoraInicio;
    }

    public void setFechaHoraInicio(LocalDateTime fechaHoraInicio) {
        this.fechaHoraInicio = fechaHoraInicio;
    }

    public LocalDateTime getFechaHoraFin() {
        return fechaHoraFin;
    }

    public void setFechaHoraFin(LocalDateTime fechaHoraFin) {
        this.fechaHoraFin = fechaHoraFin;
    }

    @Override
    public String toString() {
        return "Ruta{" +
                "idRuta=" + idRuta +
                ", idZona=" + idZona +
                ", idUsuario=" + idUsuario +
                ", fechaHoraInicio=" + fechaHoraInicio +
                ", fechaHoraFin=" + fechaHoraFin +
                '}';
    }
}

