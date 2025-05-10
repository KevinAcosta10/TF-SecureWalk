package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Respuesta;
import pe.edu.upc.backend.repositories.IRespuestaRepository;
import pe.edu.upc.backend.serviceinterfaces.IRespuestaService;

import java.util.List;
@Service
public class RespuestaImplement implements IRespuestaService {
    @Autowired
    private IRespuestaRepository rR;

    @Override
    public List<Respuesta> list() {
        return rR.findAll();
    }

    @Override
    public void insert(Respuesta r) {
        rR.save(r);
    }

    @Override
    public void update(Respuesta r) {
        rR.save(r);
    }

    @Override
    public void eliminar(int id) {
        rR.deleteById(id);
    }
}
