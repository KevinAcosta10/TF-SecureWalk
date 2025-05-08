package pe.edu.upc.backend.serviceinterfaces;

import pe.edu.upc.backend.entities.Respuesta;

import java.util.List;

public interface IRespuestaService {
    public List<Respuesta> list();
    public void insert(Respuesta respuesta);
    public void update(Respuesta respuesta);
    public void eliminar(long id);
}
