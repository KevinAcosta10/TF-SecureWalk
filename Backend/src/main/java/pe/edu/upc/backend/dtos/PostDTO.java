package pe.edu.upc.backend.dtos;

public class PostDTO {
    private int idPost;
    private String descripcionPost;
    private UsuarioRolDTO usuario;

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

    public UsuarioRolDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioRolDTO usuario) {
        this.usuario = usuario;
    }
}


