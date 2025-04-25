package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Users;

import java.util.List;

public interface IUsuarioService {
    public List<Users> list();
    public void insert(Users usua);
    public void update(Users usua);
    public void delete(int id);
}
