package pe.edu.upc.backend.entities;


import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "Ruta")
public class Ruta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRuta;
    @Column(name = "horaInicioRuta", nullable = false)
    private LocalTime horaInicioRuta;
    @Column(name = "horaFinRuta", nullable = false)
    private LocalTime horaFinRuta;
    @Column(name = "nivelSeguridadRuta", nullable = false, length = 40)
    private String nivelSeguridadRuta;

    @ManyToOne
    @JoinColumn(name = "idZona")
    private Zona idZona;

    public Ruta() {
    }

    public Ruta(int idRuta, LocalTime horaInicioRuta, LocalTime horaFinRuta, String nivelSeguridadRuta, Zona idZona) {
        this.idRuta = idRuta;
        this.horaInicioRuta = horaInicioRuta;
        this.horaFinRuta = horaFinRuta;
        this.nivelSeguridadRuta = nivelSeguridadRuta;
        this.idZona = idZona;
    }

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

    public Zona getIdZona() {
        return idZona;
    }

    public void setIdZona(Zona idZona) {
        this.idZona = idZona;
    }
}

