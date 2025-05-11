package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.dtos.UsuarioDTO;
import pe.edu.upc.backend.entities.Usuario;

import java.util.List;

public interface IUsuarioService {
<<<<<<< HEAD
    public List<Usuario> list();
    public void insert(Usuario u);
    public void update(Usuario u);
    public void delete(int id);
    public Usuario listId(int id);
=======
    public List<Usuario> listarUsuarios(); //administrador
    public void insert(Usuario usua); // administrador y usuario
    public void update(Usuario usua); //administrador
    public void delete(int id); //administrador
>>>>>>> kevin
}
