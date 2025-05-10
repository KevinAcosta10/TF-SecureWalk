package pe.edu.upc.backend.dtos;

public class ZonaDTO {
    private int idZona;
    private Float latitudZona;
    private Float longitudZona;
    private String nombreZona;

    public int getIdZona() {
        return idZona;
    }

    public void setIdZona(int idZona) {
        this.idZona = idZona;
    }

    public Float getLatitudZona() {
        return latitudZona;
    }

    public void setLatitudZona(Float latitudZona) {
        this.latitudZona = latitudZona;
    }

    public Float getLongitudZona() {
        return longitudZona;
    }

    public void setLongitudZona(Float longitudZona) {
        this.longitudZona = longitudZona;
    }

    public String getNombreZona() {
        return nombreZona;
    }

    public void setNombreZona(String nombreZona) {
        this.nombreZona = nombreZona;
    }
}
