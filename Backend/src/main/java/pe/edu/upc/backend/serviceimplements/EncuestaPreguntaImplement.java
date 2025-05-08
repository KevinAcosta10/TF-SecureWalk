package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.EncuestaPregunta;
import pe.edu.upc.backend.serviceinterfaces.IEncuestaPreguntaService;

import java.util.List;

@Service
public class EncuestaPreguntaImplement implements IEncuestaPreguntaService {
    @Autowired
    private IEncuestaPreguntaService epS;

    @Override
    public List<EncuestaPregunta> list() {
        return epS.list();
    }

    @Override
    public void insert(EncuestaPregunta ep) {
        epS.insert(ep);
    }

    @Override
    public void update(EncuestaPregunta ep) {
        epS.update(ep);
    }

    @Override
    public void eliminar(long id) {
        epS.eliminar(id);
    }
}
