package pe.edu.upc.backend.dtos;

public class UsuarioRutasCountDTO {
    private int idUsuario;
    private long cantidad;

    public UsuarioRutasCountDTO() {}

    public UsuarioRutasCountDTO(int idUsuario, long cantidad) {
        this.idUsuario = idUsuario;
        this.cantidad = cantidad;
    }

    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public long getCantidad() { return cantidad; }
    public void setCantidad(long cantidad) { this.cantidad = cantidad; }
}