package pe.edu.upc.backend.dtos;

public class CantidadIncidentesPorZona {
    private String nombreZona;
    private Long totalIncidentes;

    public String getNombreZona() {
        return nombreZona;
    }

    public void setNombreZona(String nombreZona) {
        this.nombreZona = nombreZona;
    }

    public Long getTotalIncidentes() {
        return totalIncidentes;
    }

    public void setTotalIncidentes(Long totalIncidentes) {
        this.totalIncidentes = totalIncidentes;
    }
}
