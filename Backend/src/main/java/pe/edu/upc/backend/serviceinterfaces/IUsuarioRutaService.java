package pe.edu.upc.backend.serviceinterfaces;
import pe.edu.upc.backend.entities.UsuarioRuta;

import java.util.List;

public interface IUsuarioRutaService {
    public List<UsuarioRuta> list();
    public void insert(UsuarioRuta ur);
    public void update(UsuarioRuta ur);
    public void delete(int id);
    public UsuarioRuta listId(int id);
    List<String[]> zonaxUsuario();
}
