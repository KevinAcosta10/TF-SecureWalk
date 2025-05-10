package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPost;

    @Column(name = "descripcionPost")
    private String descripcionPost;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    public Post() {
    }

    public Post(int idPost, String descripcionPost, Usuario usuario) {
        this.idPost = idPost;
        this.descripcionPost = descripcionPost;
        this.usuario = usuario;
    }

    public int getIdPost() {
        return idPost;
    }

    public void setIdPost(int idPost) {
        this.idPost = idPost;
    }

    public String getDescripcionPost() {
        return descripcionPost;
    }

    public void setDescripcionPost(String descripcionPost) {
        this.descripcionPost = descripcionPost;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
