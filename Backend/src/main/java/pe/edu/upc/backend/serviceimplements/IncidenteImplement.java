package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.dtos.IncidentesPorUsuarioDTO;
import pe.edu.upc.backend.entities.Incidente;
import pe.edu.upc.backend.repositories.IIncidenteRepository;
import pe.edu.upc.backend.serviceinterfaces.IIncidenteService;

import java.util.List;

@Service
public class IncidenteImplement implements IIncidenteService {
    @Autowired
    private IIncidenteRepository iR;

    @Override
    public List<Incidente> list() {
        return iR.findAll();
    }

    @Override
    public void insert(Incidente i) {
        iR.save(i);
    }

    @Override
    public void update(Incidente i) {
        iR.save(i);
    }

    @Override
    public void delete(int id) {
        iR.deleteById(id);
    }

    @Override
    public List<String[]> IncidentesPorUsuario() {
        return iR.IncidentesPorUsuario();
    }

}
