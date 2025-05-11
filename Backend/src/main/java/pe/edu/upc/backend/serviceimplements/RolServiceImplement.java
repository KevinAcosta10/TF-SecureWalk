package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.Rol;
import pe.edu.upc.backend.repositories.IRolRepository;
import pe.edu.upc.backend.serviceinterfaces.IRolService;

import java.util.List;
@Service
public class RolServiceImplement implements IRolService {
    @Autowired
    private IRolRepository rR;

    @Override
    public List<Rol> list() {
        return rR.findAll();
    }

    @Override
    public void insert(Rol r) {
        rR.save(r);
    }

    @Override
    public void update(Rol r) {
        rR.save(r);
    }

    @Override
    public void delete(int id) {
        rR.deleteById(id);
    }

    @Override
    public List<String[]> UsuariosRol(int id) {
        return rR.UsuariosRol(id);
    }
    @Override
    public Rol listById(int id) {
        return rR.findById(id).orElse(new Rol());
    }

}
