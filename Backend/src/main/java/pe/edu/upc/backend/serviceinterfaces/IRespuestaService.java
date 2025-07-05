package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Respuesta;

import java.util.List;

public interface IRespuestaService {
    public List<Respuesta> list();
    public void insert(Respuesta r);
    public void update(Respuesta r);
    public void eliminar(int id);
    public Respuesta listId(int id);
    List<String[]> respuestaxNombreEncuesta();
}
