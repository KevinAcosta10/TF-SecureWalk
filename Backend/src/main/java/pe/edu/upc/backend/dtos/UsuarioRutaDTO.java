package pe.edu.upc.backend.dtos;

import pe.edu.upc.backend.entities.Ruta;
import pe.edu.upc.backend.entities.Usuario;

public class UsuarioRutaDTO {
        private Long idUsuarioRuta;
        private Usuario usuario;
        private Ruta ruta;

    public Long getIdUsuarioRuta() {
        return idUsuarioRuta;
    }

    public void setIdUsuarioRuta(Long idUsuarioRuta) {
        this.idUsuarioRuta = idUsuarioRuta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Ruta getRuta() {
        return ruta;
    }

    public void setRuta(Ruta ruta) {
        this.ruta = ruta;
    }
}
