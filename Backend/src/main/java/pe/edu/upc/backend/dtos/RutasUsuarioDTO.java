package pe.edu.upc.backend.dtos;

public class RutasUsuarioDTO {
    private int idUsuarioRuta;
    private UsuarioRolDTO usuario;
    private RutaDTO ruta;

    public int getIdUsuarioRuta() {
        return idUsuarioRuta;
    }

    public void setIdUsuarioRuta(int idUsuarioRuta) {
        this.idUsuarioRuta = idUsuarioRuta;
    }

    public UsuarioRolDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioRolDTO usuario) {
        this.usuario = usuario;
    }

    public RutaDTO getRuta() {
        return ruta;
    }

    public void setRuta(RutaDTO ruta) {
        this.ruta = ruta;
    }
}
