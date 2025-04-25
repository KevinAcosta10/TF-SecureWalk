package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Table (name = "Ruta")
public class Ruta {
    private int idRuta;
    private int idZona;
    private int idUsuario;
    private LocalTime fechaHoraInicio;
    private LocalTime fechaHoraFin;

}

