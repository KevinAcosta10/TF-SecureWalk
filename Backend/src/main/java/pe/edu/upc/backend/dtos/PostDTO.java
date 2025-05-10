package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.Usuario;

public class PostDTO {
    private int idPost;
    private String descripcionPost;
    private Usuario usuario;

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


