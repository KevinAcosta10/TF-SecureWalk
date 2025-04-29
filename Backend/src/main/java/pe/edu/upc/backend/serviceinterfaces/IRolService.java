package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Rol;

import java.util.List;

public interface IRolService {
    public List<Rol> list();
    public List<String[]> UsuariosRol();
}
