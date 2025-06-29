package pe.edu.upc.backend.dtos;

public class ZonaDTO {
    private int idZona;
    private Double latitudZona;
    private Double longitudZona;
    private String nombreZona;

    public int getIdZona() {
        return idZona;
    }

    public void setIdZona(int idZona) {
        this.idZona = idZona;
    }

    public Double getLatitudZona() {
        return latitudZona;
    }

    public void setLatitudZona(Double latitudZona) {
        this.latitudZona = latitudZona;
    }

    public Double getLongitudZona() {
        return longitudZona;
    }

    public void setLongitudZona(Double longitudZona) {
        this.longitudZona = longitudZona;
    }

    public String getNombreZona() {
        return nombreZona;
    }

    public void setNombreZona(String nombreZona) {
        this.nombreZona = nombreZona;
    }
}
