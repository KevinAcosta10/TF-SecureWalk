package pe.edu.upc.backend.dtos;

public class ZonaRutasCountDTO {
    private String nombreZona;
    private long cantidad;

    public ZonaRutasCountDTO() {}

    public ZonaRutasCountDTO(String nombreZona, long cantidad) {
        this.nombreZona = nombreZona;
        this.cantidad = cantidad;
    }

    public String getNombreZona() { return nombreZona; }
    public void setNombreZona(String nombreZona) { this.nombreZona = nombreZona; }

    public long getCantidad() { return cantidad; }
    public void setCantidad(long cantidad) { this.cantidad = cantidad; }
}
