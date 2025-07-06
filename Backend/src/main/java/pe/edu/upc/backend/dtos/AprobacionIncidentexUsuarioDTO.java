package pe.edu.upc.backend.dtos;

public class AprobacionIncidentexUsuarioDTO {
    private String aprobacionIncidente;
    private int cantUsuario;

    public String getAprobacionIncidente() {
        return aprobacionIncidente;
    }

    public void setAprobacionIncidente(String aprobacionIncidente) {
        this.aprobacionIncidente = aprobacionIncidente;
    }

    public int getCantUsuario() {
        return cantUsuario;
    }

    public void setCantUsuario(int cantUsuario) {
        this.cantUsuario = cantUsuario;
    }
}
