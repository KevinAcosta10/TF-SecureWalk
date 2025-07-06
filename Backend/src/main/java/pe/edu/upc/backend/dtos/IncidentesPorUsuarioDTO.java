package pe.edu.upc.backend.dtos;


public class IncidentesPorUsuarioDTO {
    private String tipoIncidente;
    private int cantUsuario;

    public String getTipoIncidente() {
        return tipoIncidente;
    }

    public void setTipoIncidente(String tipoIncidente) {
        this.tipoIncidente = tipoIncidente;
    }

    public int getCantUsuario() {
        return cantUsuario;
    }

    public void setCantUsuario(int cantUsuario) {
        this.cantUsuario = cantUsuario;
    }
}
