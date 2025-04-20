package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Usuario;

import java.util.List;

public interface IUsuarioService {
    public List<Usuario> list();
    public void insert(Usuario usua);
    public void update(Usuario usua);
    public void delete(int id);
}
