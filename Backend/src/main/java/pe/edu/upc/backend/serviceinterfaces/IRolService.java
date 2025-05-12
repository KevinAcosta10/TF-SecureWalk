package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Rol;

import java.util.List;

public interface IRolService {
    public List<Rol> list();
    public void insert(Rol r);
    public void update(Rol r);
    public void delete(int id);
    public List<String[]> UsuariosRol(int id);
    public Rol listById(int id);
}
