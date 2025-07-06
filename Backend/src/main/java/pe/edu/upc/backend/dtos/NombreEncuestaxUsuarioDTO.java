package pe.edu.upc.backend.dtos;

public class NombreEncuestaxUsuarioDTO {
    private String nombreEncuesta;
    private int cantUsuario;

    public String getNombreEncuesta() {
        return nombreEncuesta;
    }

    public void setNombreEncuesta(String nombreEncuesta) {
        this.nombreEncuesta = nombreEncuesta;
    }

    public int getCantUsuario() {
        return cantUsuario;
    }

    public void setCantUsuario(int cantUsuario) {
        this.cantUsuario = cantUsuario;
    }
}
