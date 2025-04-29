package pe.edu.upc.backend.dtos;

public class PostPorIncidenteDTO {
    private int idPOst;
    private String descripcion;
    private String tipoIncidente;
    private String nombreZona;

    public int getIdPOst() {
        return idPOst;
    }

    public void setIdPOst(int idPOst) {
        this.idPOst = idPOst;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipoIncidente() {
        return tipoIncidente;
    }

    public void setTipoIncidente(String tipoIncidente) {
        this.tipoIncidente = tipoIncidente;
    }

    public String getNombreZona() {
        return nombreZona;
    }

    public void setNombreZona(String nombreZona) {
        this.nombreZona = nombreZona;
    }
}
