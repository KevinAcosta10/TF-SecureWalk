package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Encuesta;
import pe.edu.upc.backend.repositories.IEncuestaRepository;
import pe.edu.upc.backend.serviceinterfaces.IEncuestaService;

import java.util.List;

@Service
public class EncuestaImplement implements IEncuestaService {
    @Autowired
    private IEncuestaRepository eS;

    @Override
    public List<Encuesta> list() {
        return eS.findAll();
    }

    @Override
    public void insert(Encuesta e) {
        eS.save(e);
    }

    @Override
    public Encuesta listId(int id) {
        return eS.findById(id).orElse(new Encuesta());
    }

    @Override
    public List<String[]> cantidadEncuestasCompletadas() {
        return eS.cantidadEncuestasCompletadas();
    }

}
