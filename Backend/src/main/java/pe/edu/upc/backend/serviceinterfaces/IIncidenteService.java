package pe.edu.upc.backend.serviceinterfaces;

import org.springframework.data.repository.query.Param;
import pe.edu.upc.backend.dtos.IncidentesPorUsuarioDTO;
import pe.edu.upc.backend.entities.Incidente;
import pe.edu.upc.backend.entities.Post;

import java.util.List;

public interface IIncidenteService {
    public void insert(Incidente i);
    public List<Incidente> list();
    public void update(Incidente i);
    public void delete(int id);
    public List<String[]> IncidentesPorUsuario();

}
