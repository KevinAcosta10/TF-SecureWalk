package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Ruta;
import pe.edu.upc.backend.repositories.IRutaRepository;
import pe.edu.upc.backend.serviceinterfaces.IRutaService;

import java.util.List;

@Service
public class RutaServiceImplement implements IRutaService {
    @Autowired
    private IRutaRepository rR;

    @Override
    public List<Ruta> list() {
        return rR.findAll();
    }

    @Override
    public void insert(Ruta r) {
        rR.save(r);
    }

    @Override
    public void update(Ruta r) {
        rR.save(r);
    }

    @Override
    public void delete(int id) {
        rR.deleteById(id);
    }

    @Override
    public List<String[]> rutasAsiganasaUsuario(int id) {
        return rR.rutasAsiganasaUsuario(id);
    }

    @Override
    public Ruta listById(int id) {
        return rR.findById(id).orElse(new Ruta());
    }

}
