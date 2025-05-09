package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "UsuarioRuta")
public class UsuarioRuta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuarioRuta;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idRuta")
    private Ruta ruta;

    public UsuarioRuta() {
    }

    public UsuarioRuta(Long idUsuarioRuta, Usuario usuario, Ruta ruta) {
        this.idUsuarioRuta = idUsuarioRuta;
        this.usuario = usuario;
        this.ruta = ruta;
    }

    public Long getIdUsuarioRuta() {
        return idUsuarioRuta;
    }

    public void setIdUsuarioRuta(Long idUsuarioRuta) {
        this.idUsuarioRuta = idUsuarioRuta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Ruta getRuta() {
        return ruta;
    }

    public void setRuta(Ruta ruta) {
        this.ruta = ruta;
    }
}