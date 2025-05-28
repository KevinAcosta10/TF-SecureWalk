package pe.edu.upc.backend.entities;

import jakarta.persistence.*;

import java.util.List;

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
    @OneToMany (mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios;

    public Post() {
    }

    public Post(int idPost, String descripcionPost, Usuario usuario, List<Comentario> comentarios) {
        this.idPost = idPost;
        this.descripcionPost = descripcionPost;
        this.usuario = usuario;
        this.comentarios = comentarios;
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

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }
}
