package pe.edu.upc.backend.serviceimplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Pregunta;
import pe.edu.upc.backend.repositories.IPreguntaRepository;
import pe.edu.upc.backend.serviceinterfaces.IPreguntaService;

import java.util.List;

@Service
public class PreguntaImplement implements IPreguntaService {
    @Autowired
    private IPreguntaRepository pS;

    @Override
    public List<Pregunta> list(){
        return pS.findAll();
    }

    @Override
    public void insert(Pregunta p) {
        pS.save(p);
    }

    @Override
    public void update(Pregunta p) {
        pS.save(p);
    }

    @Override
    public void delete(int id) {
        pS.deleteById(id);
    }

}
