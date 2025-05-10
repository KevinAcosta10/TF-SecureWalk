package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Comentario")
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idComentario;

    @Column(name = "descripcionComentario")
    private String descripcionComentario;

    @ManyToOne
    @JoinColumn(name = "idPost")
    private Post post;
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    public Comentario() {
    }

    public Comentario(int idComentario, String descripcionComentario, Post post, Usuario usuario) {
        this.idComentario = idComentario;
        this.descripcionComentario = descripcionComentario;
        this.post = post;
        this.usuario = usuario;
    }

    public int getIdComentario() {
        return idComentario;
    }

    public void setIdComentario(int idComentario) {
        this.idComentario = idComentario;
    }

    public String getDescripcionComentario() {
        return descripcionComentario;
    }

    public void setDescripcionComentario(String descripcionComentario) {
        this.descripcionComentario = descripcionComentario;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
