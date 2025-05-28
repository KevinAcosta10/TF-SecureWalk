package pe.edu.upc.backend.dtos;

public class ZonaRutasCountDTO {
    private String nombreZona;
    private int cantidadRutas;

    public String getNombreZona() {
        return nombreZona;
    }

    public void setNombreZona(String nombreZona) {
        this.nombreZona = nombreZona;
    }

    public int getCantidadRutas() {
        return cantidadRutas;
    }

    public void setCantidadRutas(int cantidadRutas) {
        this.cantidadRutas = cantidadRutas;
    }
}
