package pe.edu.upc.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Zona")
public class Zona {

//Primary Key + Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idZona;

    @Column(name = "latitudZona", nullable = false)
    private Float latitudZona;
    @Column(name = "longitudZona", nullable = false)
    private Float longitudZona;
    @Column(name = "nombreZona", nullable = false, length = 200)
    private String nombreZona;

    @OneToMany(mappedBy = "zona", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Ruta> rutas;

    public Zona() {
    }

    public Zona(int idZona, Float latitudZona, Float longitudZona, String nombreZona) {
        this.idZona = idZona;
        this.latitudZona = latitudZona;
        this.longitudZona = longitudZona;
        this.nombreZona = nombreZona;
    }

    public int getIdZona() {
        return idZona;
    }

    public void setIdZona(int idZona) {
        this.idZona = idZona;
    }

    public Float getLatitudZona() {
        return latitudZona;
    }

    public void setLatitudZona(Float latitudZona) {
        this.latitudZona = latitudZona;
    }

    public Float getLongitudZona() {
        return longitudZona;
    }

    public void setLongitudZona(Float longitudZona) {
        this.longitudZona = longitudZona;
    }

    public String getNombreZona() {
        return nombreZona;
    }

    public void setNombreZona(String nombreZona) {
        this.nombreZona = nombreZona;
    }

    public List<Ruta> getRutas() {
        return rutas;
    }

    public void setRutas(List<Ruta> rutas) {
        this.rutas = rutas;
    }
}
