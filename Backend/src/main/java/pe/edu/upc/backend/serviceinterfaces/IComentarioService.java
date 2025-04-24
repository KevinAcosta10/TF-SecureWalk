package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Comentario;

import java.util.List;

public interface IComentarioService {
    public List<Comentario> list();
    public void insert(Comentario comentario);
    public void update(Comentario comentario);
    public void delete(int id);
}
