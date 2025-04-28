package pe.edu.upc.backend.serviceinterfaces;

import org.springframework.data.repository.query.Param;
import pe.edu.upc.backend.dtos.IncidentesPorUsuarioDTO;
import pe.edu.upc.backend.entities.Incidente;

import java.util.List;

public interface IIncidenteService {
    public void insert(Incidente incidente);
    public List<Incidente> list();
    public List<String[]> IncidentesPorUsuario();

}
