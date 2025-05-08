package pe.edu.upc.backend.serviceinterfaces;
import pe.edu.upc.backend.entities.UsuarioRuta;

import java.util.List;

public interface IUsuarioRutaService {
    public List<UsuarioRuta> list();
    public void insert(UsuarioRuta usuarioRuta);
    public void update(UsuarioRuta usuarioRuta);
    public void delete(long id);
}
