package pe.edu.upc.backend.dtos;

public class ComentarioDTO {
    private int idComentario;
    private String descripciónComentario;

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
}
