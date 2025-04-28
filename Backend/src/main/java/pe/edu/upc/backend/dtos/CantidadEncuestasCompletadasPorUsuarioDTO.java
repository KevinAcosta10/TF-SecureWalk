package pe.edu.upc.backend.dtos;

public class CantidadEncuestasCompletadasPorUsuarioDTO {
    private String nombreUsuario;
    private int totalEncuestasCompletadas;

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public int getTotalEncuestasCompletadas() {
        return totalEncuestasCompletadas;
    }

    public void setTotalEncuestasCompletadas(int totalEncuestasCompletadas) {
        this.totalEncuestasCompletadas = totalEncuestasCompletadas;
    }
}
