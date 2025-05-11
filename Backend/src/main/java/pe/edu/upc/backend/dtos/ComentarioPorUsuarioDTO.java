package pe.edu.upc.backend.dtos;

public class ComentarioPorUsuarioDTO {
    private int idUsuario;
    private String nombreUsuario;
    private long totalComentarios;

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public long getTotalComentarios() {
        return totalComentarios;
    }

    public void setTotalComentarios(long totalComentarios) {
        this.totalComentarios = totalComentarios;
    }
}
