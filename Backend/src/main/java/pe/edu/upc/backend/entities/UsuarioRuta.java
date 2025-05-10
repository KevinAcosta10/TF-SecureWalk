package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "UsuarioRuta")
public class UsuarioRuta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUsuarioRuta;

    @ManyToOne
    @JoinColumn(name = "idRuta", nullable = false)
    private Ruta ruta;

    @ManyToOne
    @JoinColumn(name = "idUsuario" , nullable = false)
    private Usuario usuario;

    public UsuarioRuta() {
    }

    public UsuarioRuta(int idUsuarioRuta, Ruta ruta, Usuario usuario) {
        this.idUsuarioRuta = idUsuarioRuta;
        this.ruta = ruta;
        this.usuario = usuario;
    }

    public int getIdUsuarioRuta() {
        return idUsuarioRuta;
    }

    public void setIdUsuarioRuta(int idUsuarioRuta) {
        this.idUsuarioRuta = idUsuarioRuta;
    }

    public Ruta getRuta() {
        return ruta;
    }

    public void setRuta(Ruta ruta) {
        this.ruta = ruta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}