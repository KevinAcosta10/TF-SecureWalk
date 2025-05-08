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
    private IEncuestaRepository eR;

    @Override
    public List<Encuesta> list() {
        return eR.findAll();
    }

    @Override
    public void insert(Encuesta e) {
        eR.save(e);
    }

    @Override
    public void update(Encuesta e) { eR.save(e);}

    @Override
    public void eliminar(long id) { eR.deleteById(id);}

}
