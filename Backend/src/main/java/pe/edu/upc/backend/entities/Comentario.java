package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Comentario")

public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idComentario;

    @Column(name = "descripciónComentario", nullable = false, unique = true)
    private String descripciónComentario;

    @ManyToOne
    @JoinColumn(name = "usuarioID")
    private Users usuario;

    @ManyToOne
    @JoinColumn(name = "postID")
    private Post post;

    public Comentario() {
    }

    public Comentario(int idComentario, String descripciónComentario, Users usuario, Post post) {
        this.idComentario = idComentario;
        this.descripciónComentario = descripciónComentario;
        this.usuario = usuario;
        this.post = post;
    }

    public int getIdComentario() {
        return idComentario;
    }

    public void setIdComentario(int idComentario) {
        this.idComentario = idComentario;
    }

    public String getDescripciónComentario() {
        return descripciónComentario;
    }

    public void setDescripciónComentario(String descripciónComentario) {
        this.descripciónComentario = descripciónComentario;
    }

    public Users getUsuario() {
        return usuario;
    }

    public void setUsuario(Users usuario) {
        this.usuario = usuario;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
