package pe.edu.upc.backend.dtos;

public class NombreZonaxAprobacionDTO {
    private String nombre_zona;
    private int cantAprobacion;

    public String getNombre_zona() {
        return nombre_zona;
    }

    public void setNombre_zona(String nombre_zona) {
        this.nombre_zona = nombre_zona;
    }

    public int getCantAprobacion() {
        return cantAprobacion;
    }

    public void setCantAprobacion(int cantAprobacion) {
        this.cantAprobacion = cantAprobacion;
    }
}
