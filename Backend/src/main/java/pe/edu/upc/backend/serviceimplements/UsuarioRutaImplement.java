package pe.edu.upc.backend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import pe.edu.upc.backend.entities.UsuarioRuta;
import pe.edu.upc.backend.repositories.IUsuarioRutaRepository;
import pe.edu.upc.backend.serviceinterfaces.IUsuarioRutaService;

import java.util.List;

@Service
public class UsuarioRutaImplement implements IUsuarioRutaService {
    @Autowired
    private IUsuarioRutaRepository urR;

    @Override
    public List<UsuarioRuta> list() {
        return urR.findAll();
    }

    @Override
    public void insert(UsuarioRuta ur) {
        urR.save(ur);
    }

    @Override
    public void update(UsuarioRuta ur) {urR.save(ur);
    }

    @Override
    public void delete(int id) {
        urR.deleteById(id);
    }

    @Override
    public UsuarioRuta listId(int id) {
        return urR.findById(id).orElse(new UsuarioRuta());
    }
}
