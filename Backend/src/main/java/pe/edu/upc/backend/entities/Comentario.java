package pe.edu.upc.backend.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Comentario")

public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idComentario;

    @Column(name = "descripción", nullable = false, unique = true)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "usuarioID")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "postID")
    private Post post;

    public Comentario() {
    }

    public Comentario(int idComentario, String descripcion, Usuario usuario, Post post) {
        this.idComentario = idComentario;
        this.descripcion = descripcion;
        this.usuario = usuario;
        this.post = post;
    }

    public int getIdComentario() {
        return idComentario;
    }

    public void setIdComentario(int idComentario) {
        this.idComentario = idComentario;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
