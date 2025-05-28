package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.Ruta;

public class UsuarioRutaDTO {
    private int idUsuarioRuta;
    private UsuarioRolDTO usuario;
    private Ruta ruta;

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

    public Ruta getRuta() {
        return ruta;
    }

    public void setRuta(Ruta ruta) {
        this.ruta = ruta;
    }
}
