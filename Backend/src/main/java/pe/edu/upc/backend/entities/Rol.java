package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "Rol", uniqueConstraints = {@UniqueConstraint(columnNames = {"id_usuario", "nombre_rol"})})
public class Rol implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRol;

    @Column(name = "nombreRol", nullable = false, length = 50)
    private String nombreRol;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    public Rol() {
    }

    public Rol(int idRol, String nombreRol, Usuario usuario) {
        this.idRol = idRol;
        this.nombreRol = nombreRol;
        this.usuario = usuario;
    }

    public int getIdRol() {
        return idRol;
    }

    public void setIdRol(int idRol) {
        this.idRol = idRol;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
