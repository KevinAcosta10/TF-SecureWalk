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
    public void insert(UsuarioRuta usuarioRuta) {
        urR.save(usuarioRuta);
    }

    @Override
    public void update(UsuarioRuta usuarioRuta) {
        urR.save(usuarioRuta);
    }

    @Override
    public void delete(long id) {
        urR.deleteById(id);
    }
}
