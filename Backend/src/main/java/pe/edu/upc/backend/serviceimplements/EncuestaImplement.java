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
}
