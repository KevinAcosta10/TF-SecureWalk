package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "Ruta")
public class Ruta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRuta;

    @Column(name = "horaInicio")
    private LocalTime horaInicio;
    @Column(name = "horaFin")
    private LocalTime horaFin;
    @Column(name = "nivelSeguridad")
    private int nivelSeguridad;

    @ManyToOne
    @JoinColumn(name = "idZona")
    private Zona zona;

    @OneToMany(mappedBy = "ruta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UsuarioRuta> usuariosRutas;

    public Ruta() {
    }

    public Ruta(int idRuta, LocalTime horaInicio, LocalTime horaFin, int nivelSeguridad, Zona zona, List<UsuarioRuta> usuariosRutas) {
        this.idRuta = idRuta;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.nivelSeguridad = nivelSeguridad;
        this.zona = zona;
        this.usuariosRutas = usuariosRutas;
    }

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

    public List<UsuarioRuta> getUsuariosRutas() {
        return usuariosRutas;
    }

    public void setUsuariosRutas(List<UsuarioRuta> usuariosRutas) {
        this.usuariosRutas = usuariosRutas;
    }
}

