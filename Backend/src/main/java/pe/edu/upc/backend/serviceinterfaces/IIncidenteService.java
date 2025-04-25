package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.dtos.CantidadIncidentesPorZona;
import pe.edu.upc.backend.entities.Incidente;

import java.util.List;

public interface IIncidenteService {
    public void insert(Incidente incidente);
    public List<Incidente> list();
    List<CantidadIncidentesPorZona> getIncidentesPorZona();
}
