package pe.edu.upc.backend.entities;
import jakarta.persistence.*;
@Entity
@Table(name= "Post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPost;

    @Column(name = "descripcion", nullable = false, length = 200)
    private String descripcion;

    public Post(int idPost,String descripcion) {
        this.idPost = idPost;
        this.descripcion = descripcion;
    }

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    public Post() {
    }
    public int getIdPost() {
        return idPost;
    }
    public void setIdPost(int idPost) {
        this.idPost = idPost;
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


}
