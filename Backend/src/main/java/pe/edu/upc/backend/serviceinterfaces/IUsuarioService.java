package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Usuario;

import java.util.List;

public interface IUsuarioService {
    public List<Usuario> listarUsuarios(); //administrador
    public void insert(Usuario usua); // administrador y usuario
    public void update(Usuario usua); //administrador
    public void delete(int id); //administrador
}
