package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.EncuestaPregunta;
import pe.edu.upc.backend.repositories.IEncuestaPreguntaRepository;
import pe.edu.upc.backend.serviceinterfaces.IEncuestaPreguntaService;

import java.util.List;

@Service
public class EncuestaPreguntaImplement implements IEncuestaPreguntaService {

    @Autowired
    private IEncuestaPreguntaRepository eIR;

    @Override
    public List<EncuestaPregunta> list() {
        return eIR.findAll();
    }

    @Override
    public void insert(EncuestaPregunta ep) {
        eIR.save(ep);
    }

    @Override
    public void update(EncuestaPregunta ep) {
        eIR.save(ep);
    }

    @Override
    public void eliminar(int id) {
        eIR.deleteById(id);
    }
    @Override
    public EncuestaPregunta listId(int id) {
        return eIR.findById(id).orElse(new EncuestaPregunta());
    }

}
