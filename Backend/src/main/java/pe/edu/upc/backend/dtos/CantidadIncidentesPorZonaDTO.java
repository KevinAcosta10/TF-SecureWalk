package pe.edu.upc.backend.dtos;

public class CantidadIncidentesPorZonaDTO {
    private String nombreZona;
    private int totalIncidentes;

    public String getNombreZona() {
        return nombreZona;
    }

    public void setNombreZona(String nombreZona) {
        this.nombreZona = nombreZona;
    }

    public int getTotalIncidentes() {
        return totalIncidentes;
    }

    public void setTotalIncidentes(int totalIncidentes) {
        this.totalIncidentes = totalIncidentes;
    }
}
